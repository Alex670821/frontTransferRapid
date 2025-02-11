import React, { useState } from 'react';
import axios from '../axiosConfig';
import { Link } from 'react-router-dom';

const PasswordReset = () => {
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/password_reset/', { email });
      alert('Correo de recuperación enviado');
    } catch (error) {
      console.error('Error en la recuperación de contraseña:', error);
      alert('Error en la recuperación de contraseña');
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Recuperar Contraseña</h2>
      <input type="email" name="email" placeholder="Correo electrónico" onChange={handleChange} required />
      <button type="submit">Enviar Correo</button>
      <p>
        ¿Recordaste tu contraseña? <Link to="/login">Inicia sesión</Link>
      </p>
    </form>
  );
};

export default PasswordReset;
