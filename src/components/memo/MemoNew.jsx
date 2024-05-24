import React, { useState } from "react";
import FormattedDate from "../FormattedDate";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { useNavigate } from "react-router-dom";

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

  // API
  const fetchSaveData = async (category) => {
    console.log(content);
    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER_IP}/data/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: category,
          saveData: content,
        }),
      });
      const data = await res.json();
      console.log(data);
      setContent(data);
      handleNavigate(data._id);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  console.log(content);
  return (
    <div className="memo-content-wrapper page">
      <div className="container edit">
        <div className="main-header">
          <div>
            <FormattedDate date={new Date()} format="YYYY년 MM월 DD일" />{" "}
          </div>
          <div className="btn btn-orange" onClick={() => fetchSaveData("memo")}>
            <SaveOutlinedIcon style={{ fontSize: "18px" }} />
            저장
          </div>
        </div>
        <div className="memo-content">
          <textarea name="text" id="memoContents" onChange={handleInputChange} value={content.text}></textarea>
        </div>
      </div>
    </div>
  );
};

export default MemoNew;
