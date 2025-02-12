// components/Dashboard.js
import React from "react";
import { useNavigate } from "react-router-dom";
// Importar los estilos específicos para el Dashboard

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
      <p>Bienvenido al Dashboard</p>
      {/* Aquí podrías agregar más contenido específico de tu Dashboard */}
    </div>
  );
};

export default Dashboard;
