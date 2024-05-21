import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FormattedDate from "../components/FormattedDate";

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

  const date = new Date();

  return (
    <div>
      <h1>Posts List</h1>
      <div>
        created at : <FormattedDate date={date} />
      </div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/memo/${post.id}`}>{post.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Memo;
