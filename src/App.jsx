import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Logout from './components/Logout';
import PasswordReset from './components/PasswordReset';
import EnviarFactura from './components/EnviarFactura';
import Transacciones from './components/Transacciones';
import './styles.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/password_reset" element={<PasswordReset />} />
            <Route path="/enviar-factura" element={<EnviarFactura />} />
            <Route path="/transacciones" element={<Transacciones />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
