import React, { useState } from 'react';
import axios from '../axiosConfig';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login/', formData);
      console.log('Token de acceso:', response.data.access);
      localStorage.setItem('access_token', response.data.access);
      setIsLoggedIn(true);
      alert('Inicio de sesión exitoso');
      navigate('/'); // Redirigir al inicio después de iniciar sesión
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      alert('Error en el inicio de sesión');
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Inicio de Sesión</h2>
      <input type="text" name="username" placeholder="Nombre de usuario" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
      <button type="submit">Iniciar Sesión</button>
      <p>
        ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
      </p>
      <p>
        ¿Olvidaste tu contraseña? <Link to="/password_reset">Recupérala aquí</Link>
      </p>
    </form>
  );
};

export default LoginForm;
