import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.jsx";
import { useCart } from "../../hooks/useCart.jsx";
import Navbar from "../components/Navbar.jsx";

const Cart = () => {
  const { fetchCartProducts, cartItems, removeFromCart } = useCart();

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.produto.preco * (1 - item.produto.desconto / 100).toFixed(2) * item.quantidade, 0);
  };
  console.log(cartItems)

  const deletaDoCarrinho = async (product) => {
    await removeFromCart(product);
    fetchCartProducts()
  }
  
  return (
    <div>
      <Navbar/>
      <div className="container mx-auto px-4 py-8 pt-24">
        <h1 className="text-3xl font-semibold mb-6 text-[#353535]">Carrinho de Compras</h1>
        {cartItems.length === 0 ? (
          <p className="text-lg text-[#353535]">Seu carrinho está vazio.</p>
        ) : (
          <div>
            <ul className="space-y-4">
              {cartItems.map(item => (
                <li key={item.id} className="flex items-center justify-between p-4 border-b border-[#D9D9D9]">
                  <div>
                    <h2 className="text-lg font-semibold text-[#3C6E71]">{item.produto.nome}</h2>
                    <p className="text-gray-600">Preço: ${(item.produto.preco * (1 - item.produto.desconto / 100)).toFixed(2)}</p>
                    <p className="text-gray-600">Quantidade: {item.quantidade}</p>
                  </div>
                  <button
                    onClick={() => deletaDoCarrinho(item.id)}
                    className="text-[#FF6B6B] hover:underline transition-colors"
                  >
                    Remover
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-[#3C6E71]">Subtotal: ${calculateSubtotal().toFixed(2)}</h2>
              <button
                className="px-4 py-2 font-semibold text-white bg-[#3C6E71] rounded-lg hover:bg-[#284B63] transition-colors"
              >
                Finalizar Compra
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

