import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth } from "./hooks/useAuth.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import Home from "./app/Home";
import Login from "./app/Login";
import Register from "./app/Register";
import Navbar from "./app/components/Navbar";
import Cart from "./app/pages/Cart";
import Profile from "./app/pages/Profile";
import WishList from "./app/pages/WishList";
import DashboardAdmin from "./app/pages/DashboardAdmin.jsx";
import { ModalProvider } from "./context/ModalContext.jsx";
import ProductForm from "./app/pages/ProductForm.jsx";
import CategoryProducts from "./app/pages/CategoryProducts";
import { useState } from "react";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <AuthProvider>
      <ModalProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={isAuthenticated ? <Home/> : <Login/>} />
            <Route path="/home/cart" element={isAuthenticated ? <Cart/> : <Login/>} />
            <Route path="/home/profile" element={isAuthenticated ? <Profile/> : <Login/>} />
            <Route path="/home/wish" element={isAuthenticated ? <WishList/> : <Login/>}/>
            <Route path="/home/dashboard-admin" element={isAuthenticated ? <DashboardAdmin/> : <Login/>} />
            <Route path="/add-product" element={isAuthenticated ? <ProductForm/> : <Login/>} />
            <Route path="/categorias/:slug" element={<CategoryProducts />} />
          </Routes>
        </BrowserRouter>
      </ModalProvider>
    </AuthProvider>
  );
}

export default App;


