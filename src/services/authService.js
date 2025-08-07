import api from "./api";

// Servicio de autenticación
export const authService = {
  // Login
  login: async (credentials) => {
    try {
      const response = await api.post("/auth/login", credentials);
      const { token, usuario } = response.data;

      // Guardar token y datos del usuario en localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(usuario));

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error al iniciar sesión"
      );
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  // Verificar si el usuario está autenticado
  isAuthenticated: () => {
    return localStorage.getItem("token") !== null;
  },

  // Obtener usuario actual
  getCurrentUser: () => {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },

  // Cambiar contraseña
  changePassword: async (passwordData) => {
    try {
      const response = await api.post("/auth/cambiar-password", passwordData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error al cambiar contraseña"
      );
    }
  },

  // Resetear contraseña
  resetPassword: async (resetData) => {
    try {
      const response = await api.post("/auth/reset-password", resetData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error al resetear contraseña"
      );
    }
  },
};

export default authService;
