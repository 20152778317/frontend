import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'; // Solo importa Routes y Route
import axios from './axios';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import CreateHotel from './components/Hotel/CreateHotel';
import CreateRoom from './components/Room/CreateRoom';
import HotelList from './components/Hotel/HotelList';
import { useNavigate } from 'react-router-dom';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/user');
        setUser(response.data);
      } catch (error) {
        navigate('/login');
      }
    };
    fetchUser();
  }, [navigate]);

  return (
    <div className="App">
      <h1>Gestion de Hoteles</h1>
      <Routes>
        <Route path="/" element={user ? <HotelList /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-hotel" element={<CreateHotel />} />
        <Route path="/create-room" element={<CreateRoom />} />
      </Routes>
    </div>
  );
}

export default App;
