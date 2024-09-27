import { useState, useEffect } from "react";
import axios from "axios";

export function useLiked() {
  const [likedItems, setLikedItems] = useState([]);

  const fetchLikedItems = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get("https://dripstore-api-y1ak.onrender.com/api/curtidos", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLikedItems(response.data);
      } catch (error) {
        console.error("Erro ao buscar itens dos curtidos:", error);
      }
    }
  };
  
  useEffect(() => {
    fetchLikedItems();
  }, []);

  const addToLiked = async (item) => {
    try {
      await axios.post("https://dripstore-api-y1ak.onrender.com/api/curtidos", item, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setLikedItems((prevItems) => [...prevItems, item]);
      fetchLikedItems()
    } catch (error) {
      console.error("Erro ao adicionar item aos curtidos:", error);
      alert("Você precisa está logado para curtir um produto.");
    }
  };

  const removeFromLiked = async (produtoId) => {
    try {
      await axios.delete(`https://dripstore-api-y1ak.onrender.com/api/curtidos/${produtoId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setLikedItems((prevItems) =>
        prevItems.filter((item) => item.produtoId !== produtoId)
      );
      fetchLikedItems()
    } catch (error) {
      console.error("Erro ao remover item dos curtidos:", error);
    }
  };

  return { fetchLikedItems, likedItems, addToLiked, removeFromLiked };
}
