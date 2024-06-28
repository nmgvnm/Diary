import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/ModalContext";
import axiosInstance from "../../utils/axios-config";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const { showModal } = useModal();
  const { username, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/api/auth/login", formData)
      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("refresh-token", res.data.refreshToken);
      navigate("/");
      window.location.reload();
    } catch (err) {
      console.error(err.response.data);
      if (err.response.data.msg === "Invalid credentials (err id )") {
        showModal("", "존재하지 않는 ID입니다.", () => {
          console.log("ok");
        });
      } else if (err.response.data.msg === "Invalid credentials ( err password )") {
        showModal("", "비밀번호를 확인해주세요.", () => {
          console.log("ok");
        });
      }
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
            <button className="login_btn btn" type="submit">
              Login
            </button>
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
