import React from "react";
import data from "../../data/daily_card.json";
import FormattedDate from "../FormattedDate";

const DailyGridContents = () => {
  return (
    <div className="daily-grid-content-wrap">
      {data.map((item, idx) => (
        <div className="daily-grid-content" style={{ backgroundImage: `url(${item.downloadUrl})` }} key={idx}>
          <div>
            <p>
              <FormattedDate date={item.timeCreated} format="YY.MM.DD" />
            </p>
            <p>{item.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DailyGridContents;
