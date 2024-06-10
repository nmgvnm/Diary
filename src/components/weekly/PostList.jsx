import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PostList = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${process.env.REACT_APP_SERVER_IP}/api/posts`, {
          headers: {
            "x-auth-token": token,
          },
        });
        setPosts(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, []);

  const handlePath = (path) => {
    navigate(path);
  };
  return (
    <div>
      <div className="btn" onClick={() => handlePath("/post/new")}>
        new
      </div>
      <h1>Your Posts</h1>

      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};

export default PostList;
