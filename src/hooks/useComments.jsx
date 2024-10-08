import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./useAuth.jsx";

export function useComments(produtoId) {
  const [comments, setComments] = useState([]);
  const { userId, userRole } = useAuth();

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `https://dripstore-api-y1ak.onrender.com/api/comentarios/produtos/${produtoId}/comentarios`
      );
      setComments(response.data);
    } catch (error) {
      console.error("Erro ao buscar comentários:", error);
    }
  };

  useEffect(() => {
    if (produtoId) {
      fetchComments();
    }
  }, [produtoId]);

  const addComment = async (texto) => {
    if (!texto.trim()) {
      return;
    }
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const commentData = { texto, produtoId, userType:userRole };
        const response = await axios.post(
          `https://dripstore-api-y1ak.onrender.com/api/comentarios/produtos/${produtoId}/comentarios`,
          commentData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setComments((prevComments) => [...prevComments, response.data]);
      } catch (error) {
        console.error("Erro ao adicionar comentário:", error);
        alert("Você precisa está logado para fazer um comentario.");
      }
    }
  };

  const removeComment = async (commentId) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await axios.delete(
          `https://dripstore-api-y1ak.onrender.com/api/comentarios/produtos/${produtoId}/comentarios/${commentId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setComments((prevComments) =>
          prevComments.filter((item) => item.id !== commentId)
        );
      } catch (error) {
        console.error("Erro ao remover comentário:", error);
        alert("Você não tem permissão para deletar esse comentario.");
      }
    }
  };

  return { comments, fetchComments, addComment, removeComment };
}
