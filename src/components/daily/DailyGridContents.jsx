import React from "react";
import FormattedDate from "../FormattedDate";

const DailyGridContents = ({contentList}) => {
  return (
    <div className="daily-grid-content-wrap">
      {contentList.map((item, idx) => (
        <div className="daily-grid-content" style={{ backgroundImage: `url(${item.downloadUrl})` }} key={idx}>
          <div>
            <p>
              <FormattedDate date={item.createdAt} format="YY.MM.DD" />
            </p>
            <p>{item.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DailyGridContents;
