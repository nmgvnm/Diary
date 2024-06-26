import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios-config";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { useModal } from "../../context/ModalContext";

const TodoList = () => {
  const [data, setData] = useState([]);
  const [newItem, setNewItem] = useState("");
  const { showModal } = useModal();

  useEffect(() => {
    fetchTodoList();
  }, []);
  const fetchTodoList = async () => {
    try {
      const res = await axiosInstance.get("/api/posts/list", {
        params: {
          category: "todo",
        },
      });
      setData(res.data);
      console.log("todo list => res : ", res.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const fetchSaveTodoList = async () => {
    if (newItem.trim() === "") {
      showModal("", "할 일을 입력해주세요", () => {
        console.log("Confirmed");
      });
      return;
    }
    try {
      const res = await axiosInstance.post(
        `/api/posts/save`,
        { saveData: newItem },
        {
          params: {
            category: "todo",
          },
        }
      );
      console.log(res.data);
      setNewItem("");
      fetchTodoList();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckboxChange = async (id) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER_IP}/api/posts/todo/update/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isCompleted: !data.find((item) => item._id === id).isCompleted }),
      });

      if (!res.ok) {
        throw new Error("서버 응답 오류");
      }
      const updatedData = await res.json();
      setData((prevData) =>
        prevData.map((item) =>
          item._id === updatedData._id ? { ...item, isCompleted: updatedData.isCompleted } : item
        )
      );
      console.log("updatedData:", updatedData);
    } catch (error) {
      console.error("체크리스트 업데이트 오류:", error);
    }
  };

  const fetchDeleteTodoList = async () => {
    try {
      const res = await axiosInstance.delete("/api/posts/todo/delete");
      console.log(res.data);
      fetchTodoList();
    } catch (error) {
      console.log("삭제 실패 :", error);
    } finally {
      showModal("", "삭제가 완료되었습니다.", () => {
        console.log("삭제완료");
      });
    }
  };
  const handleDeletTodoList = () => {
    showModal(
      "confirm",
      "완료건을 삭제하시겠습니까?",
      () => {
        fetchDeleteTodoList();
      },
      () => {
        console.log("todo list 삭제 취소");
      }
    );
  };
  return (
    <div className="todo-list-wrapper card">
      <div className="title">Todo List</div>
      <div className="todo-content">
        <div className="input-wrapper">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add a new task"
          />
          <div className="btn btn-dark" onClick={fetchSaveTodoList}>
            Add
          </div>
          <div className="btn btn-orange" onClick={handleDeletTodoList}>
            Remove
          </div>
        </div>
        <ul className="todo-list">
          {data.map((item, idx) => (
            <li key={idx} className="todo-item">
              <p>
                <span onClick={() => handleCheckboxChange(item._id)} style={{ cursor: "pointer" }}>
                  {item.isCompleted ? (
                    <TaskAltIcon style={{ color: "#3e563e" }} />
                  ) : (
                    <RadioButtonUncheckedIcon style={{ color: "#1f2f22" }} />
                  )}
                </span>
              </p>
              <p className={`task-item ${item.isCompleted ? "completed" : ""}`}>{item.taskTitle}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
