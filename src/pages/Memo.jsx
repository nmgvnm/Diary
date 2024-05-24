import React, { useEffect, useState } from "react";
import FormattedDate from "../components/FormattedDate";
import TitleBox from "../components/TitleBox";
import { useNavigate } from "react-router-dom";

const Memo = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_SERVER_IP}/data/list?category=memo`);
        const data = await res.json();
        setPosts(data);
        console.log("data :", data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchData();
  }, []);

  const handleNavigate = (id) => {
    navigate(`/memo/${id}`);
  };
  const handleNew = () => {
    navigate("/memo/new");
  };

  const splitText = (text) => {
    const parts = text.split(/([.\n!])/);
    const delimiterIndex = parts.findIndex((part) => part === "\n" || part === "." || part === "!");
    if (delimiterIndex === -1) {
      return { title: text, content: "추가 텍스트 없음" };
    }

    const title = parts.slice(0, delimiterIndex + 1).join("");
    let content = parts.slice(delimiterIndex + 1).join("");

    if (!content.trim()) {
      content = "추가 텍스트 없음";
    }
    return { title, content };
  };

  return (
    <div className="memo-list-wrapper page">
      <TitleBox title="Memo" />
      <div className="btn-box">
        <span className="btn" onClick={handleNew}>
          + New
        </span>
      </div>
      <div className="contents-list">
        {posts.length > 0 ? (
          <ul>
            {posts.map((post) => {
              const { title, content } = splitText(post.text);

              return (
                <li key={post._id} onClick={() => handleNavigate(post._id)}>
                  <div>
                    <div className="title">{title}</div>
                    <div>
                      <div className="date">
                        <FormattedDate date={post.createdAt} format="YY.MM.DD" />
                      </div>
                      <div className="content">{content}</div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <ul className="none-contents">
           <li>메모 없음</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Memo;
