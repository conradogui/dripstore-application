import React, { createContext, useContext } from "react";
import { useAuth } from "../hooks/useAuth.jsx";
import { useProducts } from "../hooks/useProducts.jsx";
import { useCart } from "../hooks/useCart.jsx";
import { useUsers } from "../hooks/useUsers.jsx";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const auth = useAuth();
  const produto = useProducts();
  const cart = useCart();
  const users = useUsers();

  return (
    <AuthContext.Provider
      value={{
        ...auth,
        ...produto,
        ...cart,
        ...users,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}

