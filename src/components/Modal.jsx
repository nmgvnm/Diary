import React, { useState } from "react";

const Modal = ({ type, message, show, closeModal, onConfirm, onCancel, onPrompt }) => {
  const [promptValue, setPromptValue] = useState("");

  if (!show) {
    return null;
  }

  const handleConfirm = () => {
    if (type === "prompt") {
      onPrompt(promptValue);
    } else {
      onConfirm();
    }
    closeModal(); // Confirm 버튼 클릭 후 모달 닫기
  };

  return (
    <div className={`modal_container ${show ? "show" : "none"}`} >
      <div className="modal-wrap">
        <div className="modal-box">
          <div className="modal-content">
            <p>{message}</p>
            {type === "prompt" && (
              <input type="text" value={promptValue} onChange={(e) => setPromptValue(e.target.value)} />
            )}
            <div className="btn_box">
              <button className="ok_btn btn btn-dark" onClick={handleConfirm}>OK</button>
              {type === "confirm" && <button className="cancle_btn btn btn-orange" onClick={closeModal}>Cancel</button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
