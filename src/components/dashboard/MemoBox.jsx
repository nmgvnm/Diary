import React from "react";
import data from "../../data/memo_data.json";

const MemoBox = () => {
  return (
    <div className="memo-box-wrapper card">
      <div className="memo-header">
        <div className="title">MemoBox</div>
        <div className="more">{`view more >`}</div>
      </div>
      <div className="contents">
        {data.map((item, idx) => (
          <div key={idx} className="box">
            <div className="date">{item.date}</div>
            <div className="text">{item.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoBox;
