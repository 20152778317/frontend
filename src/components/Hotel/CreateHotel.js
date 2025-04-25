import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createHotel } from '../../services/hotelService';

function CreateHotel() {
  const [hotelData, setHotelData] = useState({ nombre: '', direccion: '', ciudad: '', nit: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotelData({ ...hotelData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createHotel(hotelData);
      navigate('/');
    } catch (error) {
      setError('Hubo un error al crear el hotel.');
    }
  };

  return (
    <div>
      <h2>Crear Hotel</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="nombre" value={hotelData.nombre} onChange={handleChange} placeholder="Nombre" />
        <input type="text" name="direccion" value={hotelData.direccion} onChange={handleChange} placeholder="Dirección" />
        <input type="text" name="ciudad" value={hotelData.ciudad} onChange={handleChange} placeholder="Ciudad" />
        <input type="text" name="nit" value={hotelData.nit} onChange={handleChange} placeholder="NIT" />
        <button type="submit">Crear Hotel</button>
      </form>
    </div>
  );
}

export default CreateHotel;
