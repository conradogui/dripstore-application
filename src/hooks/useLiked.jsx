import { useState, useEffect } from "react";
import axios from "axios";

export function useLiked() {
  const [likedItems, setLikedItems] = useState([]);

  const fetchLikedItems = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get("http://localhost:5000/api/curtidos", {
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
      await axios.post("http://localhost:5000/api/curtidos", item, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setLikedItems((prevItems) => [...prevItems, item]);
      fetchLikedItems()
    } catch (error) {
      console.error("Erro ao adicionar item aos curtidos:", error);
    }
  };

  const removeFromLiked = async (produtoId) => {
    try {
      await axios.delete(`http://localhost:5000/api/curtidos/${produtoId}`, {
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
