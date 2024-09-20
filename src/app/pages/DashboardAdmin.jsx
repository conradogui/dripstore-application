import React, { useEffect, useState } from "react";
import { useModal } from "../../context/ModalContext.jsx";
import { useProducts } from "../../hooks/useProducts.jsx";
import { useUsers } from "../../hooks/useUsers.jsx";
import Modal from "../components/Modal.jsx";
import ProductForm from "./ProductForm.jsx";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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

  const [pesquisaUsuario, setPesquisaUsuario] = useState("");
  const [pesquisaProduto, setPesquisaProduto] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");

  const [currentUserPage, setCurrentUserPage] = useState(1);
  const usersPerPage = 7;

  const indexOfLastUser = currentUserPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const [currentProductPage, setCurrentProductPage] = useState(1);
  const productsPerPage = 7;

  const indexOfLastProduct = currentProductPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = produto.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalUserPages = Math.ceil(users.length / usersPerPage);

  const handleNextUserPage = () => {
    if (currentUserPage < totalUserPages) {
      setCurrentUserPage(currentUserPage + 1);
    }
  };

  const handlePreviousUserPage = () => {
    if (currentUserPage > 1) {
      setCurrentUserPage(currentUserPage - 1);
    }
  };

  const totalProductPages = Math.ceil(produto.length / productsPerPage);

  const handleNextProductPage = () => {
    if (currentProductPage < totalProductPages) {
      setCurrentProductPage(currentProductPage + 1);
    }
  };

  const handlePreviousProductPage = () => {
    if (currentProductPage > 1) {
      setCurrentProductPage(currentProductPage - 1);
    }
  };

  const usuariosFiltrados = currentUsers.filter((user) =>
    user.nome.toLowerCase().includes(pesquisaUsuario.toLowerCase())
  );

  const produtosFiltrados = currentProducts.filter((product) => {
    const nomeProdutoCorresponde = product.nome
      .toLowerCase()
      .includes(pesquisaProduto.toLowerCase());
    const categoriaCorresponde = categoriaSelecionada
      ? product.categoria === categoriaSelecionada
      : true;
    return nomeProdutoCorresponde && categoriaCorresponde;
  });

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
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Clientes</h2>
        <input
          type="text"
          placeholder="Pesquisar clientes..."
          value={pesquisaUsuario}
          className="w-full mb-4 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setPesquisaUsuario(e.target.value)}
        />
        {users.length === 0 ? (
          <p className="text-gray-600">Nenhum cliente encontrado.</p>
        ) : (
          <>
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Nome</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Data de Cadastro</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {usuariosFiltrados.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6">{user.nome}</td>
                    <td className="py-3 px-6">{user.email}</td>
                    <td className="py-3 px-6">
                      {new Date(user.data_cadastro).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={handlePreviousUserPage}
                    className="cursor-pointer"
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink>{currentUserPage}</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    onClick={handleNextUserPage}
                    className="cursor-pointer"
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </>
        )}
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Produtos</h2>
        <input
          type="text"
          placeholder="Pesquisar produtos..."
          value={pesquisaProduto}
          className="w-full mb-4 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setPesquisaProduto(e.target.value)}
        />
        <select
        name="categoria"
        value={categoriaSelecionada}
        className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 mb-4 focus:ring-blue-500"
        onChange={(e) => setCategoriaSelecionada(e.target.value)}
      >
          <option value="">Busque por categoria</option>
          <option value="Calça">Calça</option>
          <option value="Tênis">Tênis</option>
          <option value="Short">Short</option>
          <option value="Camisa">Camisa</option>
          <option value="Camiseta">Camiseta</option>
          <option value="Acessórios">Acessórios</option>
          <option value="Moletons">Moletons</option>
        </select>
        {produto.length === 0 ? (
          <p className="text-gray-600">Nenhum produto encontrado.</p>
        ) : (
          <ul className="bg-white shadow-md rounded-lg overflow-hidden">
            {produtosFiltrados.map((product) => (
              <li key={product.id} className="border-b border-gray-200 p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-800">
                      <strong>Nome:</strong> {product.nome}
                    </p>
                    <p className="text-gray-600">
                      <strong>Preço:</strong> R$ {product.preco}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleOpenModal(product)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Deletar
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={handlePreviousProductPage}
                className="cursor-pointer"
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>{currentProductPage}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={handleNextProductPage}
                className="cursor-pointer"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Outras Funções
        </h2>
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => handleOpenModal()}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Adicionar Novo Produto
          </button>
          <Modal>
            <ProductForm
              productToEdit={productToEdit}
              onProductChange={handleProductChange}
            />
          </Modal>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
            Visualizar Relatórios de Vendas
          </button>
        </div>
      </section>
    </div>
  );
};

export default DashboardAdmin;
