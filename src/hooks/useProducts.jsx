import { useState, useEffect } from "react";
import axios from "axios";

export function useProducts() {
  const [produto, setProduto] = useState([]);

  const fetchProducts = () => {
    axios
      .get("https://dripstore-api-y1ak.onrender.com/api/produto")
      .then((response) => setProduto(response.data))
      .catch((error) => console.error("Erro ao buscar produtos:", error));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const createProduct = (newProduct) => {
    console.log('Criando produto:', newProduct);
    axios
      .post("https://dripstore-api-y1ak.onrender.com/api/produto", newProduct, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        fetchProducts(); 
      })
      .catch((error) => {
        console.error("Erro ao criar o produto:", error);
      });
  };

  const updateProduct = (id, updatedData) => {
    axios
      .put(`https://dripstore-api-y1ak.onrender.com/api/produto/${id}`, updatedData)
      .then(() => {
        fetchProducts(); 
      })
      .catch((error) => {
        console.error("Erro ao atualizar produto:", error);
      });
  };

  const deleteProduct = (id) => {
    axios
      .delete(`https://dripstore-api-y1ak.onrender.com/api/produto/${id}`)
      .then(() => {
        fetchProducts(); 
      })
      .catch((error) => {
        console.error("Erro ao deletar produto:", error);
      });
  };

  return { produto, createProduct, updateProduct, deleteProduct };
}
