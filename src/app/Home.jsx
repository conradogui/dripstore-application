import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Aqui irá ficar a Landing Page</h1>
      <Link to="/login">Fazer Login</Link>{" "}
      {/*Aqui irei fazer um componente padrao (NavBar) para a Home */}
    </div>
  );
};

export default Home;
