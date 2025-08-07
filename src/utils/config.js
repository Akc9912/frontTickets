// Configuración de la aplicación
export const config = {
  // URL base de la API
  API_BASE_URL: "http://localhost:8080/api",

  // Roles de usuario
  USER_ROLES: {
    SUPERADMIN: "SUPERADMIN",
    ADMIN: "ADMIN",
    TECNICO: "TECNICO",
    TRABAJADOR: "TRABAJADOR",
  },

  // Rutas de la aplicación
  ROUTES: {
    LOGIN: "/login",
    SUPERADMIN_DASHBOARD: "/superadmin/dashboard",
    ADMIN_DASHBOARD: "/admin/dashboard",
    TECNICO_DASHBOARD: "/tecnico/dashboard",
    TRABAJADOR_DASHBOARD: "/trabajador/dashboard",
    UNAUTHORIZED: "/unauthorized",
  },

  // Configuración de tokens
  TOKEN_KEY: "token",
  USER_KEY: "user",

  // Configuración de la aplicación
  APP_NAME: "Sistema de Gestión de Tickets",
  APP_VERSION: "1.0.0",
};

export default config;
