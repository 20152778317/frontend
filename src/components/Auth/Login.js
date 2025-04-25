import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { getCsrfToken, setAuthHeader } from '../../axios';

function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await getCsrfToken(); // Obtener el token CSRF antes de hacer login

      const response = await axios.post('/login', credentials, { withCredentials: true });
      const token = response.data.token;

      setAuthHeader(token); // Establecer el token en las cabeceras para futuras solicitudes

      // Después de iniciar sesión correctamente, redirige al usuario
      navigate('/');
    } catch (error) {
      setError('Error en el login. Verifica tus credenciales.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Iniciar sesión
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Tu correo electrónico"
              value={credentials.email}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Tu contraseña"
              value={credentials.password}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Iniciar sesión
            </button>
            <a
              href="/register" // Asumiendo que tienes una ruta de registro
              className="inline-block align-baseline font-semibold text-sm text-blue-500 hover:text-blue-800"
            >
              ¿No tienes cuenta? Regístrate
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;