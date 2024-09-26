import React from "react";
import { useProducts } from "../../hooks/useProducts.jsx";
import ListModerator from "../components/ListMod.jsx";
import Navbar from "../components/Navbar.jsx";

const DashboardMod = () => {
  const { produto } = useProducts();

  return (
    <div >
      <Navbar/>
      <div className="p-8 bg-[#f4f4f9] min-h-screen">
        <h1 className="text-2xl font-bold text-[#333] mb-6">Últimos Comentários</h1>
        
        {produto.length > 0 ? (
          produto.map((product) => (
            <div key={product.id} className="mb-8">
              <h2 className="text-xl font-semibold text-[#333] mb-4">
                Produto: {product.nome}
              </h2>
              <ListModerator produtoId={product.id}/>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Nenhum produto encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardMod;
