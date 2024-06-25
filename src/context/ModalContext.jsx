import React, { createContext, useState, useContext } from "react";
import Modal from "../components/Modal"; // Assuming you have a Modal component

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState({
    show: false,
    type: "",
    message: "",
    onConfirm: () => {},
    onCancel: () => {},
    onPrompt: () => {},
  });

  const showModal = (type, message, onConfirm, onCancel) => {
    setModal({ show: true, type, message, onConfirm, onCancel });
  };

  const closeModal = () => {
    setModal({ show: false, type: "", message: "", onConfirm: () => {}, onCancel: () => {}, onPrompt: () => {} });
  };

  return (
    <ModalContext.Provider value={{ showModal, closeModal }}>
      {children}
      <Modal
        type={modal.type}
        message={modal.message}
        show={modal.show}
        closeModal={closeModal}
        onConfirm={modal.onConfirm}
        onCancel={modal.onCancel}
        onPrompt={modal.onPrompt}
      />
    </ModalContext.Provider>
  );
};
