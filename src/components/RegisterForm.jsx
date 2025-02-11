import React, { useState } from 'react';
import axios from '../axiosConfig';
import { Link, useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    rol: 'cliente', // valor por defecto
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/register/', formData);
      alert('Registro exitoso');
      navigate('/login'); // Redirigir al inicio de sesión después de registrar
    } catch (error) {
      console.error('Error en el registro:', error);
      alert('Error en el registro');
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Registro</h2>
      <input type="text" name="username" placeholder="Nombre de usuario" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Correo electrónico" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
      <button type="submit">Registrarse</button>
      <p>
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </form>
  );
};

export default RegisterForm;
