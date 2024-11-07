import React from "react";
import FormattedDate from "../FormattedDate";
import { useNavigate } from "react-router-dom";

const DailyGridContents = ({ contentList }) => {
  const navigate = useNavigate();

  const handleNavigate = (id) => {
    navigate(`/daily/${id}`);
  };
  return (
    <div className="daily-grid-content-wrap">
      {contentList.map((item, idx) => (
        <div className="daily-grid-content" onClick={() => handleNavigate(item._id)} style={{ backgroundImage: `url(${item.titleImg})` }} key={idx}>
          <div>
            <div className="top">
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
            <p className="contents-title">{item.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DailyGridContents;
