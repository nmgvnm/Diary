import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DailyRead from "./daily/DailyRead";

const DailyContents = () => {
  const { dailyId } = useParams();
  const [content, setContent] = useState([]);
  console.log("daily content: ", content);

 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_SERVER_IP}/daily/${dailyId}`);
        const data = await res.json();
        setContent(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchData();
  }, [dailyId]);

  if (!content) {
    return <div>Post not found</div>;
  }
  return (
    <div className="daily-content-wrapper page">
      <DailyRead content={content} />
    </div>
  );
};

export default DailyContents;
