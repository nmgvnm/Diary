import axios from "axios";
import React, { useState } from "react";

const PostForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const { title, content } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${process.env.REACT_APP_SERVER_IP}/api/posts`, formData, {
        headers: {
          "x-auth-token": token,
        },
      });
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <div>
        <input type="text" placeholder="Title" name="title" value={title} onChange={onChange} required />
      </div>
      <div>
        <textarea placeholder="Content" name="content" value={content} onChange={onChange} required />
      </div>
      <button type="submit">Add Post</button>
    </form>
  );
};

export default PostForm;
