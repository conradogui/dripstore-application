import { useState, useEffect } from "react";
import axios from "axios";

export function useProducts() {
  const [produto, setProduto] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://dripstore-api-y1ak.onrender.com/api/produto");
      setProduto(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  useEffect(() => {
    fetchProducts()
  }, [])

  const createProduct = async (newProduct) => {
    console.log('Criando produto:', newProduct);
    try {
      await axios.post("https://dripstore-api-y1ak.onrender.com/api/produto", newProduct);
      await fetchProducts(); 
    } catch (error) {
      console.error("Erro ao criar o produto:", error);
    }
  };

  const updateProduct = async (id, updatedData) => {
    try {
      await axios.put(`https://dripstore-api-y1ak.onrender.com/api/produto/${id}`, updatedData);
      await fetchProducts(); 
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`https://dripstore-api-y1ak.onrender.com/api/produto/${id}`);
      await fetchProducts(); 
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
    }
  };

  return { produto, fetchProducts, createProduct, updateProduct, deleteProduct };
}
