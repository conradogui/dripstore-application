import { useState, useEffect } from "react";
import axios from "axios";

export function useCart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5000/api/carrinho", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setCartItems(response.data))
        .catch((error) => console.error("Erro ao buscar itens do carrinho:", error));
    }
  }, []);

  const addToCart = (item) => {
    axios
      .post("http://localhost:5000/api/carrinho", item, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => {
        setCartItems((prevItems) => [...prevItems, item]);
      })
      .catch((error) => console.error("Erro ao adicionar item ao carrinho:", error));
  };

  const removeFromCart = (produtoId) => {
    axios
      .delete(`http://localhost:5000/api/carrinho/${produtoId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => {
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.produtoId !== produtoId)
        );
      })
      .catch((error) => console.error("Erro ao remover item do carrinho:", error));
  };

  return { cartItems, addToCart, removeFromCart };
}
