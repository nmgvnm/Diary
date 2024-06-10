import React, { useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { iconList } from "./NavIcon";
import { useLocation, useNavigate } from "react-router-dom";
import diaryImg from "../../assets/images/diary.png";
import Logout from "../auth/Logout";

const NavBar = ({ setState }) => {
  const [navbar, setNavbar] = useState(true);
  const location = useLocation();
  const nav = useNavigate();
  const hideNavbar = () => {
    setNavbar((prevState) => !prevState);
    setState((prevState) => !prevState);
  };
  const toggleMenu = (menuName, path) => {
    if (path) {
      nav(path);
    }
    sessionStorage.setItem("pathName", path);
    sessionStorage.setItem("name", menuName);
  };
  return (
    <div className={`nav-wrapper ${navbar ? "" : "hide"}`}>
      <div className="nav-header">
        <div className="profile-box">
          <div className="hide-btn" onClick={hideNavbar}>
            {navbar ? <ArrowBackIosNewIcon /> : <ArrowForwardIosOutlinedIcon />}
          </div>
          <div className="img-box">
            <div className="img"></div>
          </div>
          <div className="text-box">
            <span>윤진이의 일상</span>
          </div>
        </div>
      </div>
      <div className="nav-menu">
        {iconList.map((menu) => (
          <ul
            key={menu.path}
            className={`menu-list ${location.pathname.includes(menu.path) ? "menu" : ""
          }`}
            onClick={() => toggleMenu(menu.name, menu.path)}
          >
            <li>
              <div className="icon" style={{ color: "#c69d33" }}>
                {menu.icon}
              </div>
              <div className="text">{menu.title}</div>
            </li>
          </ul>
        ))}
      </div>
      <div className="nav-footer">
        <Logout />
        <img src={diaryImg} alt="diary" />
      </div>
    </div>
  );
};

export default NavBar;
