import React, { useEffect, useState } from "react";
import data from "../../data/memo_data.json";
import FormattedDate from "../FormattedDate";

const MemoBox = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER_IP}/data/list?category=memo`);
      const data = await res.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  return (
    <div className="memo-box-wrapper card">
      <div className="memo-header">
        <div className="title">Memo</div>
        <div className="more">{`view more >`}</div>
      </div>
      <div className="contents">
        {data.map((item, idx) => (
          <div key={idx} className="box">
            <div className="date">
              <FormattedDate date={item.createdAt} format="YY.MM.DD" />
            </div>
            <div className="text">{item.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoBox;
