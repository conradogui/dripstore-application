import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth.jsx";
import { useModal } from "../../context/ModalContext.jsx";
import { useProducts } from "../../hooks/useProducts.jsx";
import { useUsers } from "../../hooks/useUsers.jsx";
import Modal from "../components/Modal.jsx";
import ProductForm from "./ProductForm.jsx";

const DashboardAdmin = () => {
  const { users } = useUsers();
  const {
    produto,
    deleteProduct,
    createProduct,
    fetchProducts,
    updateProduct,
  } = useProducts();
  const { openModal, closeModal } = useModal();
  const [productToEdit, setProductToEdit] = useState(null);

  const handleDelete = (id) => {
    deleteProduct(id);
  };
  const handleOpenModal = (product = null) => {
    setProductToEdit(product);
    openModal();
  };

  const handleProductChange = async (product, isEdit) => {
    if (isEdit) {
      await updateProduct(productToEdit.id, product);
    } else {
      await createProduct(product);
    }
    fetchProducts();
    closeModal();
    setProductToEdit(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">Admin Dashboard</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Clientes</h2>
        {users.length === 0 ? (
          <p>Nenhum cliente encontrado.</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 border-b">Nome</th>
                <th className="py-2 border-b">Email</th>
                <th className="py-2 border-b">Data de Cadastro</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="border px-4 py-2">{user.nome}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">
                    {new Date(user.data_cadastro).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Produtos</h2>
        {produto.length === 0 ? (
          <p>Nenhum produto encontrado.</p>
        ) : (
          <ul className="bg-white border border-gray-300">
            {produto.map((product) => (
              <li key={product.id} className="border px-4 py-2 mb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <p>
                      <strong>Nome:</strong> {product.nome}
                    </p>
                    <p>
                      <strong>Preço:</strong> ${product.preco}
                    </p>
                  </div>
                  <div>
                    <button
                      onClick={() => handleOpenModal(product)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 ml-2"
                    >
                      Deletar
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Outras Funções</h2>
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => handleOpenModal()}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 mb-4"
          >
            Adicionar Novo Produto
          </button>
          <Modal>
            <ProductForm
              productToEdit={productToEdit}
              onProductChange={handleProductChange}
            />
          </Modal>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700">
            Visualizar Relatórios de Vendas
          </button>
        </div>
      </section>
    </div>
  );
};

export default DashboardAdmin;
