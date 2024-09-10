import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import model2 from "../assets/img/model2.jpg";
import logo from "../assets/img/logog.png";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signin",
        { email, senha }
      );
      const { token, id, perfis } = response.data;
      login(token, id, perfis);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Ocorreu um erro, verifique seu email e senha!"
      );
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-900">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-70"
        style={{ backgroundImage: `url(${model2})` }}
      />
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-50 rounded-lg p-4">
        <img src={logo} alt="Logo" className="w-28" />
      </div>
      <div className="relative z-10 w-full max-w-md p-8 bg-white rounded-lg shadow-lg bg-opacity-90">
        <h2 className="text-2xl font-semibold text-center text-[#353535] mb-6">
          Faça Login
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
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
    </div>
  );
};

export default Login;
