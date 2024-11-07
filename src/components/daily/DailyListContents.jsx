import React, { useState } from "react";
import FormattedDate from "../FormattedDate";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";

const DailyListContents = ({ contentList }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();
  const extractTextFromHTML = (htmlString) => {
    // DOMPurify를 사용하여 HTML을 클린하게 처리
    const cleanHTML = DOMPurify.sanitize(htmlString);

    // <br>태그를 공백 문자로 대체
    const formattedText = cleanHTML
      .replace(/<\/?p[^>]*>/g, "\n") // <p> 태그를 개행 문자로 대체
      .replace(/<\/?ol[^>]*>/g, "\n") // <ol> 태그를 개행 문자로 대체
      .replace(/<\/?ul[^>]*>/g, "\n"); // <ul> 태그를 개행 문자로 대체

    // DOM 객체를 생성하여 innerText를 이용해 텍스트만 추출
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = formattedText;
    return tempDiv.innerText;
  };

  const handleNavigate = (id) => {
    navigate(`/daily/${id}`);
  };
  return (
    <div className="daily-list-content-wrap">
      {contentList.map((item, idx) => {
        const isChecked = selectedItems.includes(item._id);
        return (
          <div className="daily-list-content" onClick={() => handleNavigate(item._id)}>
            <div style={{ backgroundImage: `url(${item.titleImg})` }} className="img-box"></div>
            <div className="text-box">
              <div>
                <p>
                  <FormattedDate date={item.createdAt} format="YY.MM.DD" />
                </p>
                <p
                  style={{
                    backgroundColor: item.category === "카테고리" && "transparent",
                  }}
                >
                  {item.category !== "카테고리" && item.category}
                </p>
              </div>
              <p>{item.title}</p>
              <p>{extractTextFromHTML(item.content)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DailyListContents;
