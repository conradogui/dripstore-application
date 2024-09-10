import React from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  const categorias = [
    { nome: "Calças", slug: "calcas" },
    { nome: "Tênis", slug: "tenis" },
    { nome: "Camisetas", slug: "camisetas" },
    { nome: "Acessórios", slug: "acessorios" },
    { nome: "Moletons", slug: "moletons" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {categorias.map((categoria) => (
        <Link
          to={`/categorias/${categoria.slug}`}
          key={categoria.slug}
          className="block p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow"
        >
          <h4 className="text-lg font-semibold">{categoria.nome}</h4>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
