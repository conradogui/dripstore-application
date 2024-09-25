import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.jsx";
import { useProducts } from "../../hooks/useProducts.jsx";
import Navbar from "../components/Navbar.jsx";

const CategoryProducts = () => {
  const { slug } = useParams();
  const { produto } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const produtosFiltrados = produto.filter(
      (item) => item.categoria.toLowerCase() === slug.toLowerCase()
    );
    setFilteredProducts(produtosFiltrados);
  }, [slug, produto]);

  return (
    <div >
      <Navbar/>
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-8">{`Produtos da categoria: ${slug}`}</h2>
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredProducts.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-lg p-6 rounded-lg hover:shadow-xl transition-shadow"
              >
                <h4 className="text-lg font-semibold mb-2">{item.nome}</h4>
                <p className="text-gray-600">{item.descricao}</p>
                <p className="text-gray-800 font-semibold">${item.preco}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>Não há produtos nesta categoria.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;
