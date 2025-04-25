import React, { useState } from 'react';
import { createRoom } from '../../services/roomService';

function CreateRoom() {
  const [roomData, setRoomData] = useState({ hotel_id: '', tipo: '', capacidad: '', precio: '' });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomData({ ...roomData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createRoom(roomData);
    } catch (error) {
      setError('Hubo un error al crear la habitación.');
    }
  };

  return (
    <div>
      <h2>Crear Habitación</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="hotel_id" value={roomData.hotel_id} onChange={handleChange} placeholder="Hotel ID" />
        <input type="text" name="tipo" value={roomData.tipo} onChange={handleChange} placeholder="Tipo" />
        <input type="number" name="capacidad" value={roomData.capacidad} onChange={handleChange} placeholder="Capacidad" />
        <input type="number" name="precio" value={roomData.precio} onChange={handleChange} placeholder="Precio" />
        <button type="submit">Crear Habitación</button>
      </form>
    </div>
  );
}

export default CreateRoom;
