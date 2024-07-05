import React from "react";
import { useNavigate } from "react-router-dom";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useModal } from "../../context/ModalContext";

const Logout = () => {
  const navigate = useNavigate();
  const { showModal } = useModal();

  const handleLogout = () => {
    console.log("로그아웃 버튼 클릭");
    showModal(
      "confirm",
      "로그아웃 하시겠습니까?",
      () => {
        console.log("Confirmed"); 
        localStorage.removeItem("token");
        localStorage.removeItem("refresh-token");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("refresh-token");

        navigate("/login");
        window.location.reload();
      },
      () => {
        console.log("Cancelled"); 
      }
    );
  };
  return (
    <div className="logout-btn-wrap" onClick={handleLogout}>
      <LogoutOutlinedIcon />
      <div className="logout-btn">Logout</div>
    </div>
  );
};

export default Logout;
