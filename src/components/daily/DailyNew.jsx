import React, { useMemo, useRef, useState } from "react";
import FormattedDate from "../FormattedDate";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import axiosInstance from "../../utils/axios-config";
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize";
import "react-quill/dist/quill.snow.css";
import QuillImageDropAndPaste from "quill-image-drop-and-paste";

import { storage } from "../../config/firebase-config"; // 'storage'를 가져옵니다
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";

Quill.register("modules/ImageResize", ImageResize);
Quill.register("modules/imageDropAndPaste", QuillImageDropAndPaste);

const DailyNew = () => {
  const [content, setContent] = useState({ title: "", content: "" });
  const quillRef = useRef(null); // useRef로 ref 생성

  const handleInputChange = (value) => {
    setContent({ ...content, content: value });
  };

  const handleTitleChange = (e) => {
    setContent({ ...content, title: e.target.value });
  };

  const fetchSaveDataUser = async () => {
    if (content.title.trim() === "" || content.content.trim() === "") {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }
    try {
      const res = await axiosInstance.post(
        `/api/posts/save`,
        {
          saveData: {
            title: content.title,
            content: content.content,
          },
        },
        {
          params: {
            category: "daily",
          },
        }
      );
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // 이미지 핸들러
  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.addEventListener("change", async () => {
      const editor = quillRef.current.getEditor();
      const file = input.files[0];
      const range = editor.getSelection(true);
      try {
        const storageRef = ref(storage, `image/${Date.now()}`);
        await uploadBytes(storageRef, file).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            // 이미지 URL 에디터에 삽입
            editor.insertEmbed(range.index, "image", url);
            // URL 삽입 후 커서를 이미지 뒷 칸으로 이동
            editor.setSelection(range.index + 1);
          });
        });
      } catch (error) {
        console.log(error);
      }
    });
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: "1" }, { header: "2" }],
          [{ size: [] }],
          ["underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
          ["link", "image"],
          ["clean"],
        ],

        handlers: {
          image: imageHandler,
        },
      },
    };
  }, []);

  const formats = ["header", "size", "underline", "strike", "blockquote", "list", "bullet", "indent", "link", "image"];

  return (
    <div className="daily-content-wrapper page">
      <div className="daily-content-container">
        <div className="main-header">
          <div>
            <FormattedDate date={new Date()} format="YYYY년 MM월 DD일" />{" "}
          </div>
          <div className="btn btn-orange" onClick={fetchSaveDataUser}>
            <SaveOutlinedIcon style={{ fontSize: "18px" }} />
            저장
          </div>
        </div>
        <div className="daily-content">
          <div className="title-input">
            <input type="text" placeholder="Enter title here" value={content.title} onChange={handleTitleChange} />
          </div>
          <div className="editor">
            <ReactQuill
              ref={quillRef}
              placeholder="내용을 입력해주세요."
              value={content.content}
              onChange={handleInputChange}
              modules={modules}
              formats={formats}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyNew;
