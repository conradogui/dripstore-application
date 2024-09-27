import { useState, useEffect } from "react";
import axios from "axios";

export function useCart() {
  const [cartItems, setCartItems] = useState([]);

  const fetchCartProducts = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get("https://dripstore-api-y1ak.onrender.com/api/carrinho", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(response.data);
      } catch (error) {
        console.error("Erro ao buscar itens do carrinho:", error);
      }
    }
  };
  
  useEffect(() => {
    fetchCartProducts();
  }, []);

  const addToCart = async (item) => {
    try {
      await axios.post("https://dripstore-api-y1ak.onrender.com/api/carrinho", item, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setCartItems((prevItems) => [...prevItems, item]);
      fetchCartProducts()
    } catch (error) {
      console.error("Erro ao adicionar item ao carrinho:", error);
      alert("Você precisa está logado para adicionar ao carrinho.");
    }
  };

  const removeFromCart = async (produtoId) => {
    try {
      await axios.delete(`https://dripstore-api-y1ak.onrender.com/api/carrinho/${produtoId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.produtoId !== produtoId)
      );
      fetchCartProducts()
    } catch (error) {
      console.error("Erro ao remover item do carrinho:", error);
    }
  };

  return { fetchCartProducts, cartItems, addToCart, removeFromCart };
}
