import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios"; 

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [produto, setProduto] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");
    const storedRoles = JSON.parse(localStorage.getItem("roles"));
  
    if (token && storedUserId && storedRoles) {
      setIsAuthenticated(true);
      setUserId(storedUserId);
      setUserRole(storedRoles);
      
      axios
        .get("https://dripstore-api-y1ak.onrender.com/api/produto")
        .then((response) => setProduto(response.data))
        .catch((error) => console.error("Erro ao buscar produtos:", error));
      if (storedRoles.includes("PERFIL_ADMIN")) {
        axios
          .get("http://localhost:5000/api/usuario", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => setUsers(response.data))
          .catch((error) => console.error("Erro ao buscar usuários:", error));
      }
      axios
        .get("http://localhost:5000/api/carrinho", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setCartItems(response.data))
        .catch((error) => console.error("Erro ao buscar itens do carrinho:", error));
    }
  }, []);

  async function handleLogin(email, senha) {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signin",
        { email, senha }
      );
      const { token, id, perfis } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", id);
      localStorage.setItem("roles", JSON.stringify(perfis));
      setIsAuthenticated(true);
      setUserId(id);
      setUserRole(perfis);
      return { success: true };
    } catch (err) {
      console.log(
        err.response?.data?.message || "Ocorreu um erro, verifique seu email e senha"
      );
      return { success: false, message: err.response?.data?.message };
    }
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("roles");
    setIsAuthenticated(false);
    setUserRole(null);
    setUserId(null);
  }

  function deleteProduct(id) {
    axios
    .delete(`https://dripstore-api-y1ak.onrender.com/api/produto/${id}`)
    .then(() => {
      setProduto((prevProduto) => prevProduto.filter((item) => item.id !== id));
    })
    .catch((error) => {
      console.error("Erro ao deletar produto:", error);
    });
  }

  function updateProduct(id, updatedData) {
    axios
      .put(`https://dripstore-api-y1ak.onrender.com/api/produto/${id}`, updatedData)
      .then(() => {
        setProduto((prevProduto) =>
          prevProduto.map((item) =>
            item.id === id ? { ...item, ...updatedData } : item
          )
        );
      })
      .catch((error) => {
        console.error("Erro ao atualizar produto:", error);
      });
  }

  function createProduct(newProduct) {
    axios
      .post("https://dripstore-api-y1ak.onrender.com/api/produto", newProduct, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      })
      .then((response) => {
        setProduto((prevProducts) => [...prevProducts, response.data]);
      })
      .catch((error) => {
        console.error("Erro ao criar o produto:", error);
      });
  }

  function addToCart(item) {
    axios
      .post("http://localhost:5000/api/carrinho", item, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => {
        setCartItems((prevItems) => [...prevItems, item]);
      })
      .catch((error) => console.error("Erro ao adicionar item ao carrinho:", error));
  }

  function removeFromCart(produtoId) {
    axios
      .delete(`http://localhost:5000/api/carrinho/${produtoId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => {
        setCartItems((prevItems) => prevItems.filter((item) => item.produtoId !== produtoId));
      })
      .catch((error) => console.error("Erro ao remover item do carrinho:", error));
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
        handleLogin,
        logout,
        cartItems,
        addToCart,
        removeFromCart,
        wishList,
        addToWishList,
        removeFromWishList,
        produto,
        createProduct,
        updateProduct,
        deleteProduct,
        users,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

