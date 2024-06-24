import React, { useEffect, useState } from "react";
import FormattedDate from "../FormattedDate";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MemoNew = () => {
  const [content, setContent] = useState({ text: "" });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContent({ ...content, [name]: value });
  };
  console.log("content:", content);
  const handleNavigate = (id) => {
    navigate(`/memo/${id}`);
  };

  // API
  const fetchSaveDataUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_IP}/api/posts/data/save/test?category=memo`,
        { saveData: content },
        {
          headers: {
            "x-auth-token": token,
            "Content-Type": "application/json",
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
