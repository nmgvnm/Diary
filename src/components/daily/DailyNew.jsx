import React, { useEffect, useMemo, useRef, useState } from "react";
import FormattedDate from "../FormattedDate";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import axiosInstance from "../../utils/axios-config";
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize";
import "react-quill/dist/quill.snow.css";
import QuillImageDropAndPaste from "quill-image-drop-and-paste";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import { storage } from "../../config/firebase-config"; // 'storage'를 가져옵니다
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import data from "../../data/category.json";
import { useModal } from "../../context/ModalContext";
import { useNavigate } from "react-router-dom";

Quill.register("modules/ImageResize", ImageResize);
Quill.register("modules/imageDropAndPaste", QuillImageDropAndPaste);

const DailyNew = () => {
  const [content, setContent] = useState({ title: "", content: "" });
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("카테고리");
  const { showModal } = useModal();
  const nav = useNavigate();
  const quillRef = useRef(null); // useRef로 ref 생성
  const [backgroundImage, setBackgroundImage] = useState(null); // file 자체를 저장
  const [backgroundImageURL, setBackgroundImageURL] = useState(""); // 미리보기 URL
  const [categoryList, setCategoryList] = useState([]);
  const handleInputChange = (value) => {
    setContent({ ...content, content: value });
  };

  const handleTitleChange = (e) => {
    setContent({ ...content, title: e.target.value });
  };

  const toggleCategoryMenu = () => {
    setIsCategoryOpen(!isCategoryOpen);
    console.log("isCategoryOpen:", isCategoryOpen);
  };

  const selectCategory = (category) => {
    setSelectedCategory(category);
    setIsCategoryOpen(false);
  };

  const handleNavigate = (path) => {
    nav(path);
  };

  const handleSaveData = () => {
    showModal(
      "confirm",
      "게시물을 저장하시겠습니까?",
      () => {
        fetchSaveDataUser();
      },
      () => {
        console.log("cancelled");
      }
    );
  };

  const fetchSaveDataUser = async () => {
    if (content.title.trim() === "" || content.content.trim() === "") {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }
    try {
      let imageURL = "";

      if (backgroundImage) {
        const storageRef = ref(storage, `image/${Date.now()}`);
        const uploadResult = await uploadBytes(storageRef, backgroundImage);
        imageURL = await getDownloadURL(uploadResult.ref);
      }
      const res = await axiosInstance.post(
        `/api/posts/save`,
        {
          saveData: {
            title: content.title,
            content: content.content,
            category: selectedCategory,
            titleImg: imageURL,
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
    } finally {
      showModal("", "저장되었습니다.", () => {
        console.log("저장완료");
        nav("/daily");
      });
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
  console.log("카테고리 데이타", data);

  const formats = ["header", "size", "underline", "strike", "blockquote", "list", "bullet", "indent", "link", "image"];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBackgroundImage(file); // 파일을 상태에 저장
      const reader = new FileReader();
      reader.onload = () => {
        setBackgroundImageURL(reader.result); // 미리보기 URL을 설정
      };
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    fetchCategoryList();
  }, []);

  const fetchCategoryList = async () => {
    try {
      const res = await axiosInstance.get("/api/posts/list", {
        params: {
          category: "categoryList",
        },
      });
      setCategoryList(res.data);
      console.log("category list => ", categoryList);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  // const fetchAddCategory= async () => {
  //   try {
  //     const res = await axiosInstance.post(
  //       `/api/posts/save`,
  //       { saveData:  },
  //       {
  //         params: {
  //           category: "memo",
  //         },
  //       }
  //     );
  //     console.log(res.data);
  //     setContent({ text: res.data.text });
  //     handleNavigate(res.data._id);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  return (
    <div className="daily-content-wrapper page">
      <div className="daily-content-container">
        <div className="main-header">
          <div>
            <FormattedDate date={new Date()} format="YYYY년 MM월 DD일" />{" "}
          </div>
          <div className="btn btn-orange" onClick={handleSaveData}>
            <SaveOutlinedIcon style={{ fontSize: "18px" }} />
            저장
          </div>
        </div>
        <div className="daily-content">
          <div className="title-input" style={{ backgroundImage: `url(${backgroundImageURL})` }}>
            <input type="text" placeholder="Enter title here" value={content.title} onChange={handleTitleChange} />
            <div className="imgbtn">
              {/* 파일 선택 창 열기 */}
              <InsertPhotoOutlinedIcon
                style={{ fontSize: "2.5rem" }}
                onClick={() => document.getElementById("imageInput").click()}
              />
              <input
                type="file"
                id="imageInput"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </div>
            <div className="category">
              <div className="category-toggle" onClick={toggleCategoryMenu}>
                {selectedCategory} ▿
              </div>
              <div className="category-list-wrapper">
                {isCategoryOpen &&
                  categoryList.map((item, idx) => (
                    <>
                      <div className="category-list" key={idx} onClick={() => selectCategory(item.name)}>
                        <p>{item.name}</p>
                      </div>
                    
                    </>
                  ))}
              </div>
            </div>
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
