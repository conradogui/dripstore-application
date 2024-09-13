import React from "react";
import ReactDOM from "react-dom";
import { useModal } from "../../context/ModalContext.jsx";

const Modal = ({ children }) => {
  const { isModalOpen, closeModal } = useModal();

  if (!isModalOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-slate-400 pt-8 rounded-lg shadow-lg w-full max-w-lg relative">
        <button
          onClick={closeModal}
          className="absolute top-1 bg-slate-800 font-extrabold right-3 border pl-2 pr-2 rounded-md transition-all text-gray-50 hover:text-gray-900 hover:bg-slate-100"
        >
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
