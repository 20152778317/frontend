import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { getCsrfToken } from '../../axios';

function Register() {
  const [userData, setUserData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await getCsrfToken();
      const response = await axios.post('/register', userData, { withCredentials: true });
      console.log(response.data);
      navigate('/login');
    } catch (error) {
      setError('Hubo un error al registrar al usuario.');
    }
  };

  return (
    <div>
      <h2>Registrarse</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={userData.name} onChange={handleChange} placeholder="Nombre" />
        <input type="email" name="email" value={userData.email} onChange={handleChange} placeholder="Email" />
        <input type="password" name="password" value={userData.password} onChange={handleChange} placeholder="Contraseña" />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default Register;
