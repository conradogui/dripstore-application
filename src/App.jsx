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

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<PrivateRoute element={<Cart />} />} />
          <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
          <Route path="/wish" element={<PrivateRoute element={<WishList />} />} />
          <Route path="/dashboard-admin" element={<PrivateRoute element={<DashboardAdmin />} />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

