import { useState, useEffect } from "react";
import axios from "axios";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");
    const storedRoles = JSON.parse(localStorage.getItem("roles"));

    if (token && storedUserId && storedRoles) {
      setIsAuthenticated(true);
      setUserId(storedUserId);
      setUserRole(storedRoles);
    }
  }, []);

  const handleLogin = async (email, senha) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/signin", {
        email,
        senha,
      });
      const { token, id, perfis } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", id);
      localStorage.setItem("roles", JSON.stringify(perfis));
      setIsAuthenticated(true);
      setUserId(id);
      setUserRole(perfis);
      return { success: true };
    } catch (err) {
      console.error(err.response?.data?.message || "Erro ao logar");
      return { success: false, message: err.response?.data?.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("roles");
    setIsAuthenticated(false);
    setUserRole(null);
    setUserId(null);
  };

  return { isAuthenticated, userId, userRole, handleLogin, logout };
}
