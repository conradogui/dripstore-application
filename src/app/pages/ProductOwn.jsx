import React from "react";
import { useCart } from "../../hooks/useCart.jsx";

const ProductOwn = ({ unicProduct }) => {
  const { addToCart } = useCart();
  if (!unicProduct) {
    return (
      <p className="text-center text-gray-500 text-lg">
        Produto não encontrado.
      </p>
    );
  }

  const precoComDesconto = (
    unicProduct.preco *
    (1 - unicProduct.desconto / 100)
  ).toFixed(2);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
        Detalhes do Produto
      </h2>
      <div className="bg-white shadow-2xl p-8 rounded-xl transform hover:scale-105 transition-transform duration-300">
        <h4 className="text-2xl font-semibold mb-4 text-gray-900">
          {unicProduct.nome}
        </h4>
        <p className="text-sm font-medium text-gray-500 mb-2 uppercase">
          Categoria: {unicProduct.categoria}
        </p>
        <p className="text-base text-gray-600 mb-6 leading-relaxed">
          {unicProduct.descricao}
        </p>

        {unicProduct.desconto > 0 ? (
          <div className="mb-4">
            <p className="text-lg text-red-600 font-bold">
              Desconto: {unicProduct.desconto}% OFF
            </p>
            <p className="text-xl font-bold text-gray-800">
              Preço com Desconto:{" "}
              <span className="text-green-600">${precoComDesconto}</span>
            </p>
            <p className="text-sm text-gray-500 line-through">
              Preço Original: ${unicProduct.preco}
            </p>
          </div>
        ) : (
          <p className="text-xl font-bold text-gray-800 mb-4">
            Preço: <span className="text-green-600">${unicProduct.preco}</span>
          </p>
        )}

        <button
          onClick={() => addToCart({ ...unicProduct, quantidade: 1 })}
          className="w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
};

export default ProductOwn;
