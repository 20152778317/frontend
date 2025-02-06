import axios from 'axios';

// Crear una instancia de Axios con la URL base
const instance = axios.create({
  baseURL: 'http://localhost:8000/api', // URL base de tu API en Laravel
  withCredentials: true, // Importante para manejar cookies de sesión con Sanctum
});

// Función para obtener el token CSRF antes de hacer solicitudes autenticadas
export const getCsrfToken = async () => {
  try {
    // Esta solicitud obtiene el token CSRF de Sanctum
    await axios.get('http://localhost:8000/sanctum/csrf-cookie', { withCredentials: true });
  } catch (error) {
    console.error("Error obteniendo el token CSRF:", error);
    throw error;
  }
};

// Función para configurar el token de autorización en las cabeceras
export const setAuthHeader = (token) => {
  // Si el token existe, agrega el token a las cabeceras de futuras solicitudes
  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    // Si el token es null o no existe, elimina el token de las cabeceras
    delete instance.defaults.headers.common['Authorization'];
  }
};

// Exportar la instancia de Axios para usarla en otros lugares
export default instance;
