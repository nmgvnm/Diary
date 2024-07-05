import React, { useEffect, useState } from "react";
import TitleBox from "../components/TitleBox";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import DailyGridContents from "../components/daily/DailyGridContents";
import DailyListContents from "../components/daily/DailyListContents";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios-config";

const Daily = () => {
  const [selectCategory, setSelectCategory] = useState("전체");
  const [align, setAlign] = useState("list");
  const category = ["전체", "일상", "여행", "맛도리"];
  const [contentList, setContentList] = useState([]);
  const nav = useNavigate();

  const handleSelectCategory = (category) => {
    setSelectCategory(category);
  };
  const handleSelectAlign = (align) => {
    setAlign(align);
  };
  const handleNavigate = (path) => {
    nav(path);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axiosInstance.get("/api/posts/list", {
        params: {
          category: "daily",
        },
      });
      setContentList(res.data);
      console.log("daily list => res:", res);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  console.log("contentList:", contentList);

  return (
    <div className="daily-list-wrapper page">
      <TitleBox title="Daily Memory" />
      <div className="btn-box">
        <div className="category-box">
          <div>
            <span>카테고리</span>
            {category.map((item, idx) => (
              <span
                onClick={() => handleSelectCategory(item)}
                className={`category ${selectCategory === item ? "select" : ""}`}
                key={idx}
              >
                {item}
              </span>
            ))}
          </div>
          <div className="align">
            <span onClick={() => handleSelectAlign("grid")} className={align === "grid" ? "select" : ""}>
              <GridViewOutlinedIcon />
            </span>
            <span onClick={() => handleSelectAlign("list")} className={align === "list" ? "select" : ""}>
              <FormatListBulletedOutlinedIcon />
            </span>
          </div>
        </div>
        <span className="btn" onClick={() => handleNavigate("/daily/new")}>
          + New
        </span>
      </div>
      <div className={`contents-list ${align === "grid" ? "" : "list"}`}>
        {align === "grid" ? (
          <DailyGridContents contentList={contentList} />
        ) : (
          <DailyListContents contentList={contentList} />
        )}
      </div>
    </div>
  );
};

export default Daily;
