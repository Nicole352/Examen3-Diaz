import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE = 'http://localhost:5000';

// Configurar axios para incluir cookies
axios.defaults.withCredentials = true;

export const authAPI = {
  // Verificar si está autenticado
  checkAuth: async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/me`);
      return response.data;
    } catch (error) {
      return null;
    }
  },

  // Logout
  logout: async () => {
    try {
      await axios.post(`${API_BASE}/auth/logout`);
      // Limpiar cookies del lado del cliente también
      Cookies.remove('token');
      Cookies.remove('auth_token');
      window.location.reload();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  },

  // Obtener token desde cookie (para Socket.IO)
  getToken: () => {
    // Intentar primero con auth_token (accesible), luego con token
    return Cookies.get('auth_token') || Cookies.get('token');
  }
};