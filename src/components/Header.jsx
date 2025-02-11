import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <h1>Transferencias</h1>
      <nav>
        <Link to="/register">Registro</Link>
        <Link to="/login">Inicio de Sesión</Link>
        <Link to="/logout">Cerrar Sesión</Link>
        <Link to="/password_reset">Recuperar Contraseña</Link>
      </nav>
    </header>
  );
};

export default Header;
