import React, { useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import './EnviarFactura.css'; // Importa los estilos

const EnviarFactura = () => {
  const [email, setEmail] = useState('');
  const [cliente, setCliente] = useState('');
  const [direccion, setDireccion] = useState('');
  const [items, setItems] = useState([{ descripcion: '', cantidad: 1, precio_unitario: 0, total: 0 }]);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const calcularTotalFactura = () => {
    return items.reduce((sum, item) => sum + item.total, 0).toFixed(2);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    if (field === 'cantidad' || field === 'precio_unitario') {
      newItems[index].total = newItems[index].cantidad * newItems[index].precio_unitario;
    }
    setItems(newItems);
  };

  const handleAddItem = () => {
    setItems([...items, { descripcion: '', cantidad: 1, precio_unitario: 0, total: 0 }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, cliente, direccion, total: calcularTotalFactura(), items };
    try {
      const response = await axios.post('http://localhost:8000/messages/enviar-factura/', data);
      if (response.data.mensaje) {
        setMensaje(response.data.mensaje);
        setError('');
      } else {
        setMensaje('');
        setError('Hubo un error al enviar la factura.');
      }
    } catch (err) {
      setError('No se pudo conectar con el servidor.');
      setMensaje('');
    }
  };

  return (
    <div className="container">
      <h2>Enviar Factura</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="text" placeholder="Cliente" value={cliente} onChange={(e) => setCliente(e.target.value)} required />
        </div>
        <input type="text" placeholder="Dirección" value={direccion} onChange={(e) => setDireccion(e.target.value)} required />

        <h3>Detalles de la Factura</h3>
        <table>
          <thead>
            <tr>
              <th>Descripción</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td><input type="text" value={item.descripcion} onChange={(e) => handleItemChange(index, 'descripcion', e.target.value)} /></td>
                <td><input type="number" value={item.cantidad} onChange={(e) => handleItemChange(index, 'cantidad', e.target.value)} /></td>
                <td><input type="number" value={item.precio_unitario} onChange={(e) => handleItemChange(index, 'precio_unitario', e.target.value)} /></td>
                <td>${item.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="footer">
          <button type="button" onClick={handleAddItem} className="add-btn">Añadir Producto</button>
          <div className="total">
            <strong>Total Factura: ${calcularTotalFactura()}</strong>
          </div>
        </div>

        <button type="submit" className="submit-btn">Enviar Factura</button>
      </form>

      {mensaje && <p className="success">{mensaje}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default EnviarFactura;
