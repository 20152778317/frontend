import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';

function HotelList() {
  const [hoteles, setHoteles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHoteles = async () => {
      try {
        const response = await axios.get('/hoteles'); 
        setHoteles(response.data);
      } catch (err) {
        setError('No se pudieron cargar los hoteles. Asegúrate de estar autenticado.');
      } finally {
        setLoading(false);
      }
    };

    fetchHoteles();
  }, []);

  const handleCrearHotel = () => {
    navigate('/create-hotel');
  };

  const handleCrearHabitacion = () => {
    navigate('/create-room');
  };

  return (
    <div>
      <h2>Lista de Hoteles</h2>
      {loading ? (
        <p>Cargando hoteles...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <>
          <button onClick={handleCrearHotel}>Crear nuevo hotel</button>
          <button onClick={handleCrearHabitacion}>Crear habitación</button>
          {hoteles.length === 0 ? (
            <p>No hay hoteles registrados.</p>
          ) : (
            <ul>
              {hoteles.map((hotel) => (
                <li key={hotel.id}>
                  <strong>{hotel.nombre}</strong> — {hotel.ciudad} — NIT: {hotel.nit}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

export default HotelList;
