import React from "react";
import FormattedDate from "../FormattedDate";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DOMPurify from "dompurify";

const MemoRead = ({ date, content, mode }) => {
  const handleEdit = () => {
    mode(true);
  };
  const sanitizedContent = DOMPurify.sanitize(content.text, {
    ADD_TAGS: ["p"],
    ADD_ATTR: ["class"],
    FORBID_TAGS: ["style"]
  });
  return (
    <div className="container">
      <div className="main-header">
        <div>
          <FormattedDate date={date} format="YYYY년 MM월 DD일" />{" "}
        </div>
        <div className="btn btn-dark" onClick={handleEdit}>
          <ModeEditOutlineOutlinedIcon style={{ fontSize: "18px" }} />
          수정
        </div>
      </div>
      <div className="memo-content" dangerouslySetInnerHTML={{ __html: sanitizedContent }}></div>
    </div>
  );
};

export default MemoRead;
