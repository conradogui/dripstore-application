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
import ProductOwn from "./app/pages/ProductOwn.jsx";
import DashboardMod from "./app/pages/DashboardMod.jsx";

function App() {
  const { isAuthenticated } = useAuth();
  const [product, setProduct] = useState([]);

  return (
    <AuthProvider value={{ product, setProduct }}>
      <ModalProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/home"
              element={isAuthenticated ? <Home /> : <Login />}
            />
            <Route
              path="/home/cart"
              element={isAuthenticated ? <Cart /> : <Login />}
            />
            <Route
              path="/home/profile"
              element={isAuthenticated ? <Profile /> : <Login />}
            />
            <Route
              path="/home/wish"
              element={isAuthenticated ? <WishList /> : <Login />}
            />
            <Route
              path="/home/dashboard-admin"
              element={isAuthenticated ? <DashboardAdmin /> : <Login />}
            />
            <Route
              path="/add-product"
              element={isAuthenticated ? <ProductForm /> : <Login />}
            />
            <Route path="/home/dashboard-mod" element={<DashboardMod />} />
            <Route path="/categorias/:slug" element={<CategoryProducts />} />
            <Route path="/produto/:slug" element={<ProductOwn />} />
          </Routes>
        </BrowserRouter>
      </ModalProvider>
    </AuthProvider>
  );
}

export default App;
