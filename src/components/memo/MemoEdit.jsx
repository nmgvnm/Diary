import React from "react";
import FormattedDate from "../FormattedDate";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

const MemoEdit = ({ date, content, mode, edit, update }) => {
  
  const handleInputChange = (e) => {
    const {name, value} = e.target
    edit({...content, [name] : value})
  }
  const handleUpdateData = () => {
    update("memo")
    mode(false);
  }

 
  return (
    <div className="container edit">
      <div className="main-header">
        <div>
          <FormattedDate date={date} format="YYYY년 MM월 DD일" />{" "}
        </div>
        <div className="btn btn-orange" onClick={handleUpdateData}>
          <SaveOutlinedIcon style={{ fontSize: "18px" }} />
          저장
        </div>
      </div>
      <div className="memo-content">
        <textarea name="text" id="memoContents" onChange={handleInputChange} value={content.text}></textarea>
      </div>
    </div>
  );
};

export default MemoEdit;
