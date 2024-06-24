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
    } finally {
      window.location.reload();
    }
  };
  const nav = (path) => {
    navigate(path);
  };

  return (
    <div className="login_container">
      <div className="login_wrapper">
        <div className="login_title">
          <h1>Login</h1>
        </div>
        <div className="login_form_wrapper">
          <form onSubmit={onSubmit}>
            <div>
              <label>ID</label>
              <input type="text" name="username" value={username} onChange={onChange} required />
            </div>
            <div>
              <label>PW</label>
              <input type="password" name="password" value={password} onChange={onChange} required />
            </div>
            <button className="login_btn btn" type="submit">Login</button>
            <button className="singup_btn btn" onClick={() => nav("/register")}>
              Sing up
            </button>
          </form>
        </div>
        <div className="text_account_box">
          <p>{"TEST Account ( 테스트 계정 )"}</p>
          <p>ID : apple</p>
          <p>PW : apple</p>
        </div>
        
      </div>
    </div>
  );
};

export default Login;
