import { useState, useEffect } from "react";
import axios from "axios";

export function useUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRoles = JSON.parse(localStorage.getItem("roles"));

    if (token && storedRoles?.includes("PERFIL_ADMIN")) {
      axios
        .get("https://dripstore-api-y1ak.onrender.com/api/usuario", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setUsers(response.data))
        .catch((error) => console.error("Erro ao buscar usuários:", error));
    }
  }, []);

  return { users };
}
