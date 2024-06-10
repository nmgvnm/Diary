import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterForm = () => {
  const [formData, setformData] = useState({ username: "", Password: "" });
  const navigate = useNavigate();
  const { username, password } = formData;

  const onChange = (e) => setformData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_SERVER_IP}/api/auth/register`, formData);
      navigate("/login");
    } catch (err) {
      console.error(err.response.data);
    }
  };
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>Username</label>
          <input type="text" name="username" value={username} onChange={onChange} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" value={password} onChange={onChange} required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
