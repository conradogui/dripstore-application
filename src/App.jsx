import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import Home from "./app/Home";
import Login from "./app/Login";
import Register from "./app/Register";
import Cart from "./app/pages/Cart";
import Profile from "./app/pages/Profile";
import WishList from "./app/pages/WishList";
import DashboardAdmin from "./app/pages/DashboardAdmin.jsx";
import { ModalProvider } from "./context/ModalContext.jsx";
import ProductForm from "./app/pages/ProductForm.jsx";
import CategoryProducts from "./app/pages/CategoryProducts";
import ProductOwn from "./app/pages/ProductOwn.jsx";
import DashboardMod from "./app/pages/DashboardMod.jsx";

function App() {
  const { isAuthenticated } = useAuth();




  return (
    <AuthProvider value={{ isAuthenticated }}>
      <ModalProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/home"
              element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/home/cart"
              element={isAuthenticated ? <Cart /> : <Navigate to="/login" />}
            />
            <Route
              path="/home/profile"
              element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
            />
            <Route
              path="/home/wish"
              element={isAuthenticated ? <WishList /> : <Navigate to="/login" />}
            />
            <Route
              path="/home/dashboard-admin"
              element={isAuthenticated ? <DashboardAdmin /> : <Navigate to="/login" />}
            />
            <Route
              path="/add-product"
              element={isAuthenticated ? <ProductForm /> : <Navigate to="/login" />}
            />
            <Route
              path="/home/dashboard-mod"
              element={isAuthenticated ? <DashboardMod /> : <Navigate to="/login" />}
            />
            <Route path="/categorias/:slug" element={<CategoryProducts />} />
            <Route path="/produto/:slug" element={<ProductOwn />} />
          </Routes>
        </BrowserRouter>
      </ModalProvider>
    </AuthProvider>
  );
}

export default App;
