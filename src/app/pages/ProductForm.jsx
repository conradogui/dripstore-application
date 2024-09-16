import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth.jsx";
import { useModal } from "../../context/ModalContext.jsx";
import { useProducts } from "../../hooks/useProducts.jsx";

const ProductForm = ({ productToEdit }) => {
  const { createProduct, updateProduct } = useProducts();
  const { closeModal } = useModal();
  const [product, setProduct] = useState({
    nome: "",
    preco: "",
    descricao: "",
    desconto: "",
    ativo: false,
    categoria: "",
  });

  useEffect(() => {
    if (productToEdit) {
      setProduct(productToEdit);
    }
  }, [productToEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (productToEdit) {
        updateProduct(productToEdit.id, product);
      }
      createProduct(product);

      setProduct({
        nome: "",
        preco: "",
        descricao: "",
        desconto: "",
        ativo: false,
        categoria: "",
      });
      closeModal();
      console.log(product);
    } catch (error) {
      console.error("Erro ao salvar o produto:", error);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        {productToEdit ? "Editar Produto" : "Adicionar Produto"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Nome do Produto
          </label>
          <input
            type="text"
            name="nome"
            value={product.nome}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Preço
          </label>
          <input
            type="number"
            name="preco"
            value={product.preco}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Descrição
          </label>
          <textarea
            value={product.descricao}
            name="descricao"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Desconto (%)
          </label>
          <input
            type="number"
            name="desconto"
            value={product.desconto}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Categoria
          </label>
          <select
            value={product.categoria}
            name="categoria"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
            required
          >
            <option value="">Selecione uma categoria</option>
            <option value="Calça">Calça</option>
            <option value="Tênis">Tênis</option>
            <option value="Short">Short</option>
            <option value="Camisa">Camisa</option>
            <option value="Camiseta">Camiseta</option>
            <option value="Acessórios">Acessórios</option>
            <option value="Moletons">Moletons</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="inline-flex items-center text-gray-700">
            <input
              type="checkbox"
              name="ativo"
              checked={product.ativo}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 text-indigo-600"
            />
            <span className="ml-2">Produto Ativo</span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          {productToEdit ? "Atualizar Produto" : "Adicionar Produto"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;

