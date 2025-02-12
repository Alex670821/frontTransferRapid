import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CountryList = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('access_token');  // Obtener el token del almacenamiento local
    if (!token) {
      console.error('Token no encontrado');
      return;
    }

    axios.get('http://127.0.0.1:8000/api/transfers/countries/', {
      headers: {
        Authorization: `Bearer ${token}`  // Incluir el token en los encabezados
      }
    })
    .then(response => {
      setCountries(response.data);  // Guardar los países obtenidos
    })
    .catch(error => {
      console.error('Error fetching countries', error);
    });
  }, []);

  return (
    <div>
      <h1>Countries</h1>
      <ul>
        {countries.map(country => (
          <li key={country.id}>
            {country.name} - Comisión: {country.commission} - Impuesto: {country.tax}%
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryList;
