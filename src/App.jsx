import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./app/Home.jsx";
import Login from "./app/Login.jsx";
import Register from "./app/Register.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
