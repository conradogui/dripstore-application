import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      setUserRole(null);
    }
  }, []);

  function login(token, role) {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    setUserRole(role);
  }

  function logout() {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUserRole(null);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
