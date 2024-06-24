import React from "react";
import { useNavigate } from "react-router-dom";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");

      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      window.location.reload();
    }
  };
  return (
    <div className="logout-btn-wrap" onClick={handleLogout}>
      <LogoutOutlinedIcon />
      <div className="logout-btn">Logout</div>
    </div>
  );
};

export default Logout;
