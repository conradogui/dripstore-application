import React, { createContext, useContext } from "react";
import { useAuth } from "../hooks/useAuth.jsx";
import { useProducts } from "../hooks/useProducts.jsx";
import { useCart } from "../hooks/useCart.jsx";
import { useWishList } from "../hooks/useWishList.jsx";
import { useUsers } from "../hooks/useUsers.jsx";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const auth = useAuth();
  const produto = useProducts();
  const cart = useCart();
  const wishList = useWishList();
  const users = useUsers();

  return (
    <AuthContext.Provider
      value={{
        ...auth,
        ...produto,
        ...cart,
        ...wishList,
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

