import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth.jsx";
import Navbar from "../components/Navbar.jsx";

function Profile() {
  const { userId } = useAuth(); 
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/usuario/${userId}`, {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
          });
          const userData = await response.json();
          setFormData({ name: userData.nome, email: userData.email });
        } catch (error) {
          console.error("Erro ao buscar os dados do usuário:", error);
        }
      };

      fetchUserData();
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/usuario/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          nome: formData.name,
          email: formData.email,
        }),
      });

      if (response.ok) {
        console.log("Dados atualizados com sucesso");
        setIsEditing(false);
      } else {
        console.error("Erro ao atualizar os dados");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  return (
    <div>
      <Navbar/>
      <div className="max-w-xl mx-auto p-5 bg-[#FFFFFF] rounded shadow pt-32">
        <h1 className="text-2xl font-bold mb-5 text-[#353535]">Meu Perfil</h1>
        {!isEditing ? (
          <div>
            <p><strong>Nome:</strong> {formData.name}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <button
              onClick={handleEditToggle}
              className="mt-5 px-4 py-2 bg-[#3C6E71] text-white rounded hover:bg-[#284B63]"
            >
              Editar Perfil
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#353535]">Nome</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-[#3C6E71] rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#353535]">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-[#3C6E71] rounded-md"
              />
            </div>
            <button
              type="submit"
              className="mt-5 px-4 py-2 bg-[#3C6E71] text-white rounded hover:bg-[#284B63]"
            >
              Salvar
            </button>
            <button
              type="button"
              onClick={handleEditToggle}
              className="mt-5 ml-3 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancelar
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Profile;

