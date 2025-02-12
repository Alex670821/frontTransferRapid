import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";
import Login from "./components/Login";
import ResetPassword from "./components/ResetPassword";
import Dashboard from "./components/Dashboard";
import TransferForm from "./components/TransferForm";
import CountryList from "./components/CountryList";
import Header from "./components/Header"; // Importar el componente Header
import Footer from "./components/Footer"; // Importar el componente Footer
import './styles.css';
import './header.css';
import './login.css';
import './footer.css';
import './dashboard.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Verificación del token de autenticación
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      // Llamada a la API para obtener la información del usuario
      axios.get('http://localhost:8000/api/user/', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error("Error fetching user data", error);
        setIsAuthenticated(false);
      });
    }
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={
              <>
                <Header />
                <div className="main-content">
                  <Login setIsAuthenticated={setIsAuthenticated} />
                </div>
                <Footer />
              </>
            }
          />
          <Route
            path="/reset-password"
            element={
              <>
                <Header />
                <div className="main-content">
                  <ResetPassword />
                </div>
                <Footer />
              </>
            }
          />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard user={user} /> : <Navigate to="/login" />}
          />
          <Route
            path="/transfer"
            element={isAuthenticated ? <TransferForm /> : <Navigate to="/login" />}
          />
          <Route
            path="/countries"
            element={isAuthenticated ? <CountryList /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
