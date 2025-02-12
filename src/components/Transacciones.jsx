import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/transacciones/';

const Transacciones = () => {
  const [transacciones, setTransacciones] = useState([]);
  const [formData, setFormData] = useState({
    destinatario_nombre: '',
    destinatario_pais: '',
    destinatario_telefono: '',
    monto: '',
    comision: '',
    impuesto: '',
    estado: 'pendiente',
  });
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTransacciones();
  }, []);

  const fetchTransacciones = async () => {
    try {
      const response = await axios.get(API_URL);
      setTransacciones(response.data);
    } catch (err) {
      setError('Error al obtener las transacciones.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_URL, formData);
      setMensaje('Transacción creada exitosamente');
      setError('');
      setFormData({
        destinatario_nombre: '',
        destinatario_pais: '',
        destinatario_telefono: '',
        monto: '',
        comision: '',
        impuesto: '',
        estado: 'pendiente',
      });
      fetchTransacciones();
    } catch (err) {
      setError('Error al crear la transacción.');
      setMensaje('');
    }
  };

  return (
    <div>
      <h2>Transacciones</h2>
      {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="destinatario_nombre" placeholder="Nombre del destinatario" value={formData.destinatario_nombre} onChange={handleChange} required />
        <input type="text" name="destinatario_pais" placeholder="País del destinatario" value={formData.destinatario_pais} onChange={handleChange} required />
        <input type="text" name="destinatario_telefono" placeholder="Teléfono del destinatario" value={formData.destinatario_telefono} onChange={handleChange} />
        <input type="number" name="monto" placeholder="Monto" value={formData.monto} onChange={handleChange} required />
        <input type="number" name="comision" placeholder="Comisión" value={formData.comision} onChange={handleChange} required />
        <input type="number" name="impuesto" placeholder="Impuesto" value={formData.impuesto} onChange={handleChange} required />
        <button type="submit">Crear Transacción</button>
      </form>

      <h3>Lista de Transacciones</h3>
      <ul>
        {transacciones.map((transaccion) => (
          <li key={transaccion.id}>
            {transaccion.destinatario_nombre} - {transaccion.monto} USD ({transaccion.estado})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transacciones;
