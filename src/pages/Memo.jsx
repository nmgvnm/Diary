import React, { useEffect, useState } from "react";
import FormattedDate from "../components/FormattedDate";
import TitleBox from "../components/TitleBox";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios-config";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { useModal } from "../context/ModalContext";

const Memo = () => {
  const [posts, setPosts] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [editmode, setEditmode] = useState(false);
  const { showModal } = useModal();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axiosInstance.get("/api/posts/list", {
        params: {
          category: "memo",
        },
      });
      setPosts(res.data);
      console.log("memo list => res:", res);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleNavigate = (id) => {
    if (editmode) {
      return;
    } else {
      navigate(`/memo/${id}`);
    }
  };
  const handleNew = () => {
    navigate("/memo/new");
  };

  const splitText = (text) => {
    const parts = text.split(/([.\n!])/);
    const delimiterIndex = parts.findIndex((part) => part === "\n" || part === "." || part === "!");
    if (delimiterIndex === -1) {
      return { title: text, content: "추가 텍스트 없음" };
    }

    const title = parts.slice(0, delimiterIndex + 1).join("");
    let content = parts.slice(delimiterIndex + 1).join("");

    if (!content.trim()) {
      content = "추가 텍스트 없음";
    }
    return { title, content };
  };

  const handleEditMode = () => {
    setEditmode((prevEditMode) => !prevEditMode);
    setSelectedItems("");
  };

  const handleDeletPost = () => {
    if (selectedItems.length < 1) {
      return;
    }
    showModal(
      "confirm",
      selectedItems.length + "건의 메모를 삭제하시겠습니까?",
      () => {
        console.log("삭제합니다");
        fetchDeleteItem();
      },
      () => {
        console.log("삭제 취소");
      }
    );
  };

  const handleCheckboxChange = (postId) => {
    if (selectedItems.includes(postId)) {
      setSelectedItems(selectedItems.filter((item) => item !== postId));
    } else {
      setSelectedItems([...selectedItems, postId]);
    }
  };

  const fetchDeleteItem = async () => {
    console.log("selectedItems:", selectedItems);
    try {
      const res = await axiosInstance.delete("/api/posts/delete", {
        data: {
          deleteItem: selectedItems,
        },
        params: {
          category: "memo",
        },
      });
      console.log(res.data);
      fetchData();
      setEditmode(false);
      showModal("", "삭제가 완료되었습니다.", () => {
        console.log("삭제완료");
      });
    } catch (error) {
      showModal("", "삭제에러 문의요망.", () => {
        console.log("삭제 실패", error);
      });
    }
  };

  return (
    <div className="memo-list-wrapper page">
      <TitleBox title="Memo" />
      <div className="btn-box">
        {editmode && (
          <span className={`btn delete-btn btn-orange`} onClick={handleDeletPost}>
            삭제
          </span>
        )}
        <span className="btn seleted-btn " onClick={handleEditMode}>
          {editmode ? "취소" : "메모 선택"}
        </span>
        <span className="btn new-btn btn-dark" onClick={handleNew}>
          + New
        </span>
      </div>
      <div className="contents-list">
        {posts.length > 0 ? (
          <ul>
            {posts.map((post) => {
              const { title, content } = splitText(post.text);
              const isChecked = selectedItems.includes(post._id);
              return (
                <li key={post._id} className={`${isChecked ? "checked" : ""}`}>
                  {editmode && (
                    <div className="selcete-btn" onClick={() => handleCheckboxChange(post._id)}>
                      {isChecked ? <TaskAltIcon /> : <RadioButtonUncheckedIcon />}
                    </div>
                  )}
                  <div onClick={() => handleNavigate(post._id)}>
                    <div className="title">{title}</div>
                    <div>
                      <div className="date">
                        <FormattedDate date={post.createdAt} format="YY.MM.DD" />
                      </div>
                      <div className="content">{content}</div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <ul className="none-contents">
            <li>메모 없음</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Memo;
