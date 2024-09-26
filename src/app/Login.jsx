import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";
import model2 from "../assets/img/model2.jpg";
import logo from "../assets/img/logog.png";
import Navbar from "./components/Navbar.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated, handleLogin } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { success, message } = await handleLogin(email, senha);
    if (success) {
      navigate("/home");
    } else {
      setError(message || "Ocorreu um erro ao fazer login.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 items-center justify-center bg-gray-50">
        <div className="max-w-4xl w-full bg-white rounded-lg shadow-xl overflow-hidden flex">
          <div className="w-1/2 p-8">
            <div className="mb-6 text-center">
              <img src={logo} alt="Logo" className="w-20 mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-center text-[#353535] mb-6">
              Faça Login
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#353535]">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 mt-1 text-gray-700 bg-[#D9D9D9] border border-[#3C6E71] rounded-lg focus:ring-2 focus:ring-[#3C6E71] focus:outline-none"
                  placeholder="Digite seu email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#353535]">
                  Senha
                </label>
                <input
                  type="password"
                  id="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="w-full px-4 py-2 mt-1 text-gray-700 bg-[#D9D9D9] border border-[#3C6E71] rounded-lg focus:ring-2 focus:ring-[#3C6E71] focus:outline-none"
                  placeholder="Digite sua senha"
                  required
                />
              </div>
              {error && <p className="text-sm text-red-500 text-center">{error}</p>}
              <button
                type="submit"
                className="w-full py-2 mt-4 font-semibold text-white bg-gradient-to-r from-[#3C6E71] via-[#284B63] to-[#353535] rounded-lg hover:bg-gradient-to-l focus:ring-2 focus:ring-offset-2 focus:ring-[#3C6E71]"
              >
                Entrar
              </button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Não tem uma conta?{" "}
                <NavLink
                  to="/register"
                  className="text-[#3C6E71] font-medium hover:text-[#284B63]"
                >
                  Cadastre-se
                </NavLink>
              </p>
            </div>
          </div>

          <div className="w-1/2 hidden md:flex items-center justify-center bg-gray-200">
            <img
              src={model2}
              className="object-cover w-full h-full grayscale"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
