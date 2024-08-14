import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Home from "./app/Home.jsx";
import Login from "./app/Login.jsx";

function App() {
  const [data, setData] = useState([]);
  const URL_PRODUTOS = "https://dripstore-api-y1ak.onrender.com/api/produto";

  const getProdutos = async () => {
    try {
      const response = await axios.get(URL_PRODUTOS);
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProdutos();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
