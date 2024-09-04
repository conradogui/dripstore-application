import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [wishList, setWishList] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");
    const storedRoles = JSON.parse(localStorage.getItem("roles"));
  
    if (token && storedUserId && storedRoles) {
      setIsAuthenticated(true);
      setUserId(storedUserId);
      setUserRole(storedRoles); 
    } else {
      setIsAuthenticated(false);
      setUserRole(null);
      setUserId(null);
    }
  }, []);
  

  function login(token, id, roles) {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", id);
    localStorage.setItem("roles", JSON.stringify(roles)); 
    setIsAuthenticated(true);
    setUserId(id);
    setUserRole(roles); 
  }
  

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("roles"); 
    setIsAuthenticated(false);
    setUserRole(null);
    setUserId(null);
  }
  

  function addToCart(item) {
    setCartItems((prevItems) => [...prevItems, item]);
  }

  function removeFromCart(id) {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  function addToWishList(item) {
    setWishList((prevItems) => [...prevItems, item]);
  }

  function removeFromWishList(id) {
    setWishList((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userId,
        userRole,
        login,
        logout,
        cartItems,
        addToCart,
        removeFromCart,
        wishList,
        addToWishList,
        removeFromWishList,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
