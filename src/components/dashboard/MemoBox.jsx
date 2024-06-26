import React, { useEffect, useState } from "react";
import FormattedDate from "../FormattedDate";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios-config"


const MemoBox = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);
  const handleNavigate = () => {
    navigate(`/memo`);
  };
  const fetchData = async () => {
    try {
      const res = await axiosInstance.get("/api/posts/list", {
        params: {
          category: "memo",
        },
      });
      setData(res.data);
      console.log("memo list => res:", res);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  return (
    <div className="memo-box-wrapper card">
      <div className="memo-header">
        <div className="title">Memo</div>
        <div className="more" onClick={handleNavigate}>{`view more >`}</div>
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
