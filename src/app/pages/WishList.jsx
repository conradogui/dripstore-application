import React from "react";
import { useAuth } from "../../context/AuthContext.jsx";

const WishList = () => {
  const { wishList, removeFromWishList, addToCart } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6 text-[#353535]">Lista de Interesse</h1>
      {wishList.length === 0 ? (
        <p className="text-lg text-[#353535]">Sua lista de interesse está vazia.</p>
      ) : (
        <div>
          <ul className="space-y-4">
            {wishList.map((item) => (
              <li key={item.id} className="flex items-center justify-between p-4 border-b border-[#D9D9D9]">
                <div>
                  <h2 className="text-lg font-semibold text-[#3C6E71]">{item.nome}</h2>
                  <p className="text-gray-600">Preço: ${item.preco}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => addToCart({ ...item, quantity: 1 })}
                    className="px-4 py-2 font-semibold text-white bg-[#3C6E71] rounded-lg hover:bg-[#284B63] transition-colors"
                  >
                    Adicionar ao Carrinho
                  </button>
                  <button
                    onClick={() => removeFromWishList(item.id)}
                    className="text-[#FF6B6B] hover:underline transition-colors"
                  >
                    Remover
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WishList;

