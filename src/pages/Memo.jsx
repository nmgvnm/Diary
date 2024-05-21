import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FormattedDate from "../components/FormattedDate";
import TitleBox from "../components/TitleBox";

const Memo = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_SERVER_IP}/data/list?category=memo`);
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="memo-list-wrapper page">
      <TitleBox title="Memo" />
      <div className="btn-box">
        <span className="btn">+ New</span>
      </div>
      <div className="contents-list">
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <Link to={`/memo/${post.id}`}>
                <div >
                  <div className="title">{post.text}</div>
                  <div>
                    <div className="date">
                      <FormattedDate date={post.createdAt} format="YY.MM.DD" />
                    </div>
                    <div className="content">{post.text}</div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Memo;
