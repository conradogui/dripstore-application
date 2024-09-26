import React, { useState } from "react";
import shoes from "../assets/img/logog.png";
import Navbar from "./components/Navbar.jsx";

const Register = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmSenha: '',
    perfis: [],
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.senha !== formData.confirmSenha) {
      setError("As senhas devem ser iguais!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          senha: formData.senha,
          perfis: formData.perfis,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess(data.msg);
        setError(""); 
        setFormData({ nome: '', email: '', senha: '', confirmSenha: '', perfis: [] });
      } else {
        setError(data.message);
        setSuccess("");
      }
    } catch (error) {
      console.error('Error:', error);
      setError("Ocorreu um erro ao tentar registrar.");
    }
  };

  return (
    <div >
      <Navbar/>
      <div className="relative flex flex-col md:flex-row items-center justify-center min-h-screen bg-[#D9D9D9] pt-14">
        <div className="absolute inset-0 bg-gradient-to-r from-[#D9D9D9] to-[#FFFFFF] opacity-60"></div>
        <div className="hidden md:block md:w-1/2 h-full relative z-10 border-none bg-transparent">
          <img src={shoes} alt="Shoes" className="min-w-80 h-full object-cover" />
        </div>
        <div className="relative z-20 w-full max-w-md p-8 bg-white rounded-lg shadow-lg md:w-1/2 md:rounded-none md:shadow-none">
          <h2 className="text-4xl font-bold text-center text-[#353535] mb-8">
            Cadastre-se
          </h2>
          {success && <p className="text-sm text-green-600 text-center mb-4">{success}</p>}
          {error && <p className="text-sm text-red-600 text-center mb-4">{error}</p>}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-[#353535]">
                Nome Completo
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 mt-1 text-[#353535] bg-[#D9D9D9] border border-[#3C6E71] rounded-lg shadow-sm focus:ring-2 focus:ring-[#3C6E71] focus:outline-none"
                placeholder="Digite seu nome"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#353535]">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 mt-1 text-[#353535] bg-[#D9D9D9] border border-[#3C6E71] rounded-lg shadow-sm focus:ring-2 focus:ring-[#3C6E71] focus:outline-none"
                placeholder="Digite seu email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#353535]">
                Senha
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-3 mt-1 text-[#353535] bg-[#D9D9D9] border border-[#3C6E71] rounded-lg shadow-sm focus:ring-2 focus:ring-[#3C6E71] focus:outline-none"
                placeholder="Crie uma senha"
                value={formData.senha}
                onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#353535]">
                Confirme a Senha
              </label>
              <input
                type="password"
                id="confirm-password"
                className="w-full px-4 py-3 mt-1 text-[#353535] bg-[#D9D9D9] border border-[#3C6E71] rounded-lg shadow-sm focus:ring-2 focus:ring-[#3C6E71] focus:outline-none"
                placeholder="Confirme sua senha"
                value={formData.confirmSenha}
                onChange={(e) => setFormData({ ...formData, confirmSenha: e.target.value })}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 mt-6 font-semibold text-white bg-gradient-to-r from-[#3C6E71] to-[#284B63] rounded-lg shadow-md hover:from-[#284B63] hover:to-[#3C6E71] focus:ring-2 focus:ring-offset-2 focus:ring-[#3C6E71]"
            >
              Cadastrar
            </button>
          </form>
          <div className="mt-8 text-center">
            <p className="text-sm text-[#353535]">
              Já tem uma conta?{" "}
              <a
                href="/login"
                className="text-[#3C6E71] font-semibold hover:text-[#284B63]"
              >
                Faça Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

