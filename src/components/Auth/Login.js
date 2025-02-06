import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { getCsrfToken, setAuthHeader } from '../../axios';  // Si 'Login.js' está en 'src/components/Auth/'



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
            const token = response.data.token; // Suponiendo que el backend envíe el token en la respuesta

            setAuthHeader(token); // Establecer el token en las cabeceras para futuras solicitudes

            // Después de iniciar sesión correctamente, redirige al usuario
            navigate('/');
        } catch (error) {
            setError('Error en el login. Verifica tus credenciales.');
        }
    };

    return (
        <div className="Login">
            <h2>Iniciar sesión</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={credentials.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={credentials.password}
                    onChange={handleChange}
                />
                <button type="submit">Iniciar sesión</button>
            </form>
        </div>
    );
}

export default Login;
