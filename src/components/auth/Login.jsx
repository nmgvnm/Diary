import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const { username, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_SERVER_IP}/api/auth/login`, formData);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      console.error(err.response.data);
    }
  };
  const nav = (path) => {
    navigate(path)
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>Username</label>
          <input type="text" name="username" value={username} onChange={onChange} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" value={password} onChange={onChange} required />
        </div>
        <button type="submit">Login</button>
        <button type="submit" onClick={() => nav("/register")}>회원가입</button>
      </form>
    </div>
  );
};

export default Login;
