import React, { useEffect, useState } from "react";
import FormattedDate from "../FormattedDate";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { useNavigate } from "react-router-dom";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import axiosInstance from "../../utils/axios-config";

const MemoNew = () => {
  const [content, setContent] = useState({ text: "" });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContent({ ...content, [name]: value });
  };
  const handleNavigate = (id) => {
    navigate(`/memo/${id}`);
  };

  const handleNavList = (path) => {
    navigate(path)
  }

  // API
  const fetchSaveDataUser = async () => {
    try {
      const res = await axiosInstance.post(
        `/api/posts/save`,
        { saveData: content },
        {
          params: {
            category: "memo",
          },
        }
      );
      console.log(res.data);
      setContent({ text: res.data.text });
      handleNavigate(res.data._id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "s") {
      e.preventDefault();
      fetchSaveDataUser();
    }
  };

  // eslint-disable-next-line
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="memo-content-wrapper page">
      <div className="container edit">
        <div className="main-header">
          <div>
            <FormattedDate date={new Date()} format="YYYY년 MM월 DD일" />{" "}
          </div>
          <div className="btn btn-dark" onClick={() => handleNavList("/memo")} style={{marginRight: "5px"}}>
          <FormatListBulletedOutlinedIcon style={{ fontSize: "18px" }} />
          목록
        </div>
          <div className="btn btn-orange" onClick={fetchSaveDataUser}>
            <SaveOutlinedIcon style={{ fontSize: "18px" }} />
            저장
          </div>
        </div>
        <div className="memo-content">
          <textarea
            placeholder="Enter your memo here"
            name="text"
            id="memoContents"
            onChange={handleInputChange}
            value={content.text}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default MemoNew;
