import React, { useState, useEffect } from 'react';
import { useAuth } from "../../context/AuthContext.jsx";

const DashboardAdmin = () => {
  const {users, produto, userRole} = useAuth()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">Admin Dashboard</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Clientes</h2>
        {users.length === 0 ? (
          <p>Nenhum cliente encontrado.</p>
        ) : (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2">Nome</th>
                <th className="py-2">Email</th>
                <th className="py-2">Data de Cadastro</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td className="border px-4 py-2">{user.nome}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">{new Date(user.createdAt).toLocaleDateString()}</td>
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
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2">Nome</th>
                <th className="py-2">Preço</th>
                <th className="py-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {produto.map(product => (
                <tr key={product.id}>
                  <td className="border px-4 py-2">{product.nome}</td>
                  <td className="border px-4 py-2">${product.preco}</td>
                  <td className="border px-4 py-2">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                      Editar
                    </button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 ml-2">
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Outras Funções</h2>
        <div className="flex flex-col space-y-4">
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
            Adicionar Novo Produto
          </button>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700">
            Visualizar Relatórios de Vendas
          </button>
        </div>
      </section>
    </div>
  );
};

export default DashboardAdmin;
