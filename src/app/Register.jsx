import React from "react";
import shoes from "../assets/img/logog.png";

const Register = () => {
  return (
    <div className="relative flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-300 opacity-60"></div>
      <div className="hidden md:block md:w-1/2 h-full relative z-10 border-none bg-transparent">
        <img src={shoes} alt="Shoes" className="min-w-80 h-full object-cover" />
      </div>
      <div className="relative z-20 w-full max-w-md p-8 bg-white rounded-lg shadow-lg md:w-1/2 md:rounded-none md:shadow-none">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Cadastre-se
        </h2>
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Nome Completo
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-3 mt-1 text-gray-800 bg-gray-100 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Digite seu nome"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 mt-1 text-gray-800 bg-gray-100 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Digite seu email"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Senha
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 mt-1 text-gray-800 bg-gray-100 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Crie uma senha"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Confirme a Senha
            </label>
            <input
              type="password"
              id="confirm-password"
              className="w-full px-4 py-3 mt-1 text-gray-800 bg-gray-100 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Confirme sua senha"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-6 font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cadastrar
          </button>
        </form>
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Já tem uma conta?{" "}
            <a
              href="/login"
              className="text-blue-600 font-semibold hover:text-blue-700"
            >
              Faça Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
