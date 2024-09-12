import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./app/Home";
import Login from "./app/Login";
import Register from "./app/Register";
import Navbar from "./app/components/Navbar";
import Cart from "./app/pages/Cart";
import Profile from "./app/pages/Profile";
import WishList from "./app/pages/WishList";
import PrivateRoute from "./hooks/PrivateRoute.jsx";
import DashboardAdmin from "./app/pages/DashboardAdmin.jsx";
import { ModalProvider } from "./context/ModalContext.jsx";
import ProductForm from "./app/pages/ProductForm.jsx";
import CategoryProducts from "./app/pages/CategoryProducts";

function App() {
  return (
    <AuthProvider>
      <ModalProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home/cart" element={<PrivateRoute element={<Cart />} />} />
          <Route path="/home/profile" element={<PrivateRoute element={<Profile />} />} />
          <Route path="/home/wish" element={<PrivateRoute element={<WishList />} />} />
          <Route path="/home/dashboard-admin" element={<PrivateRoute element={<DashboardAdmin />} />} />
          <Route path="/add-product" element={<PrivateRoute element={<ProductForm />} />} />
          <Route path="/categorias/:slug" element={<CategoryProducts />} />
          </Routes>
        </BrowserRouter>
      </ModalProvider>
    </AuthProvider>
  );
}

export default App;


