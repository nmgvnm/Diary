import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios-config";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    diaryName: "",
  });
  const navigate = useNavigate();
  const { username, password, confirmPassword, diaryName } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      await axiosInstance.post("/api/auth/register", formData)
      navigate("/login");
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const nav = (path) => {
    navigate(path);
  };
  return (
    <div className="register_container">
      <div className="register_wrapper">
        <div className="register_title">
          <h1>Sing up</h1>
        </div>
        <div className="register_form_wrapper">
          <form onSubmit={onSubmit}>
            <div>
              <label>아이디</label>
              <input type="text" name="username" placeholder="ID" value={username} onChange={onChange} required />
            </div>
            <div>
              <label>비밀번호</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                placeholder="Password"
                required
              />
            </div>
            <div>
              <label>비밀번호 확인</label>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={onChange}
                placeholder="Confirm Password"
                required
              />
            </div>
            <div>
              <label>다이어리 이름</label>
              <input
                type="text"
                name="diaryName"
                value={diaryName}
                onChange={onChange}
                placeholder="Diary Name"
                required
              />
            </div>

            <div className="btn_box">
              <button type="submit" className="singup_btn btn">
                Sing up
              </button>
              <button className="login_btn btn" onClick={() => nav("/login")}>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
