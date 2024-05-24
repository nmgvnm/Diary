import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MemoRead from "./memo/MemoRead";
import MemoEdit from "./memo/MemoEdit";

const MemoContents = () => {
  const { memoId } = useParams(); // URL 파라미터에서 postId를 가져옴
  const [content, setContent] = useState(); // 게시물 데이터를 저장할 상태
  const [isEdit, setIsEdit] = useState(false);
  const date = new Date();
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

  const fetchUpdateData = async (category) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER_IP}/data/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: category,
          updateData: content,
        }),
      });
      if (!res.ok) {
        throw new Error("데이터 업데이트 실패");
      }
      const updatedMemo = await res.json();
      console.log("업데이트된 메모 :", updatedMemo);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };
  return (
    <div className="memo-content-wrapper page">
      {isEdit ? (
        <MemoEdit date={date} content={content} edit={setContent} mode={setIsEdit} update={fetchUpdateData} />
      ) : (
        <MemoRead date={content.createdAt} content={content} mode={setIsEdit} />
      )}
    </div>
  );
};

export default MemoContents;
