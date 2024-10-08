import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import "./index.css";
import { ModalProvider } from "./context/ModalContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <ModalProvider>
    <AuthProvider>
        <App />
    </AuthProvider>
      </ModalProvider>
  </React.StrictMode>
);
