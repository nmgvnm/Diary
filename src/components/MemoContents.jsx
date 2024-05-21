import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MemoContents = () => {
  const { memoId } = useParams(); // URL 파라미터에서 postId를 가져옴
  const [content, setContent] = useState(); // 게시물 데이터를 저장할 상태
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_SERVER_IP}/memo/${memoId}`);
        const data = await res.json();
        setContent(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchData();
  }, [memoId]);

  if (!content) {
    return <div>Post not found</div>;
  }
  console.log("postId:", memoId);
  return (
    <div>
      <h1>{content.text}</h1>
    </div>
  );
};

export default MemoContents;
