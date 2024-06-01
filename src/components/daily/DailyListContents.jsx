import React from "react";
import data from "../../data/daily_card.json";
import FormattedDate from "../FormattedDate";

const DailyListContents = () => {
  return (
    <div className="daily-list-content-wrap">
      {data.map((item, idx) => (
        <div className="daily-list-content" key={idx}>
          <div style={{ backgroundImage: `url(${item.downloadUrl})` }} className="img-box"></div>
          <div className="text-box">
            <p>
              <FormattedDate date={item.timeCreated} format="YY.MM.DD" />
            </p>
            <p>{item.title}</p>
            <p>{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DailyListContents;
