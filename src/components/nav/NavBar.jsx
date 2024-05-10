import React, { useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { iconList } from "./NavIcon";
import { useLocation, useNavigate } from "react-router-dom";

const NavBar = () => {
  const [navbar, setNavbar] = useState(true);
  const location = useLocation();
  const nav = useNavigate();
  const hideNavbar = () => {
    setNavbar((prevState) => !prevState);
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
            className={`menu-list ${location.pathname === menu.path ? "menu" : ""}`}
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
        <div className="hide-btn" onClick={hideNavbar}>
          {navbar ? <ArrowBackIosNewIcon /> : <ArrowForwardIosOutlinedIcon />}
        </div>
      </div>
      <div className="nav-footer">footer</div>
    </div>
  );
};

export default NavBar;
