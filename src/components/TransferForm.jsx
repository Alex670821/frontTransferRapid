import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransferForm = () => {
  const [countries, setCountries] = useState([]);
  const [transferData, setTransferData] = useState({
    sender_name: '',
    receiver_name: '',
    phone: '',
    address: '',
    amount: '',
    country: '',
    postal_code: '',
    description: '',
    email: ''
  });
  const [commission, setCommission] = useState(0);
  const [tax, setTax] = useState(0);

  // Función para obtener el token y hacer la solicitud
  const fetchCountries = () => {
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
  };

  useEffect(() => {
    fetchCountries();  // Llamar a la función cuando el componente se monta
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransferData(prevState => ({
      ...prevState,
      [name]: value
    }));

    if (name === 'country') {
      const selectedCountry = countries.find(country => country.id === parseInt(value));
      if (selectedCountry) {
        setCommission(selectedCountry.commission);
        setTax(selectedCountry.tax);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('Token no encontrado');
      return;
    }

    axios.post('http://127.0.0.1:8000/api/transfers/countries/', {
      ...transferData,
      commission,
      tax
    }, {
      headers: {
        Authorization: `Bearer ${token}`  // Incluir el token en los encabezados
      }
    })
    .then(response => {
      alert('Transferencia creada con éxito');
    })
    .catch(error => {
      console.error('Error creando la transferencia', error);
    });
  };

  return (
    <div>
      <h1>Crear Transferencia Internacional</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="sender_name"
          placeholder="Nombre del Remitente"
          value={transferData.sender_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="receiver_name"
          placeholder="Nombre del Receptor"
          value={transferData.receiver_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Teléfono"
          value={transferData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Dirección"
          value={transferData.address}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Monto"
          value={transferData.amount}
          onChange={handleChange}
          required
        />
        <select
          name="country"
          value={transferData.country}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona un país</option>
          {countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="postal_code"
          placeholder="Código Postal"
          value={transferData.postal_code}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Descripción"
          value={transferData.description}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          value={transferData.email}
          onChange={handleChange}
          required
        />
        <button type="submit">Crear Transferencia</button>
      </form>
    </div>
  );
};

export default TransferForm;
