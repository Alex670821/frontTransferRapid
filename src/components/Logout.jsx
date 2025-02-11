import React from 'react';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout/', { refresh: localStorage.getItem('refresh_token') });
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      alert('Sesión cerrada correctamente');
      navigate('/login');  // Utiliza navigate en lugar de history.push
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      alert('Error al cerrar sesión');
    }
  };

  return (
    <button onClick={handleLogout} className="logout-button">Cerrar Sesión</button>
  );
};

export default Logout;
