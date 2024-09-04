import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const Cart = () => {
  const { cartItems, removeFromCart, isAuthenticated } = useAuth();

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.preco * item.quantity, 0);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">Carrinho de Compras</h1>
      {cartItems.length === 0 ? (
        <p className="text-lg">Seu carrinho está vazio.</p>
      ) : (
        <div>
          <ul className="space-y-4">
            {cartItems.map(item => (
              <li key={item.id} className="flex items-center justify-between p-4 border-b">
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-600">Preço: ${item.preco}</p>
                  <p className="text-gray-600">Quantidade: {item.quantity}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:underline"
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Subtotal: ${calculateSubtotal()}</h2>
            <button
              className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Finalizar Compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
