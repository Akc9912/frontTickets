import React, { createContext, useContext, useState, useEffect } from "react";
import { authAPI, apiUtils } from "../services/api";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay un usuario logueado al cargar la aplicación
    const currentUser = apiUtils.getCurrentUser();
    if (currentUser && apiUtils.isAuthenticated()) {
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      // USUARIOS HARDCODEADOS PARA DESARROLLO
      const hardcodedUsers = [
        {
          email: "admin@example.com",
          password: "123456",
          usuario: {
            id: 1,
            nombre: "Super Administrador",
            email: "admin@example.com",
            rol: "SUPERADMIN",
            fechaCreacion: "2025-01-15T10:30:00",
            activo: true,
          },
          token: "fake-superadmin-token-123456",
        },
        {
          email: "admin2@example.com",
          password: "123456",
          usuario: {
            id: 2,
            nombre: "Administrador",
            email: "admin2@example.com",
            rol: "ADMIN",
            fechaCreacion: "2025-02-15T10:30:00",
            activo: true,
          },
          token: "fake-admin-token-123456",
        },
        {
          email: "tecnico@example.com",
          password: "123456",
          usuario: {
            id: 3,
            nombre: "Carlos Técnico",
            email: "tecnico@example.com",
            rol: "TECNICO",
            fechaCreacion: "2025-03-15T10:30:00",
            activo: true,
          },
          token: "fake-tecnico-token-123456",
        },
        {
          email: "trabajador@example.com",
          password: "123456",
          usuario: {
            id: 4,
            nombre: "María Trabajadora",
            email: "trabajador@example.com",
            rol: "TRABAJADOR",
            fechaCreacion: "2025-04-15T10:30:00",
            activo: true,
          },
          token: "fake-trabajador-token-123456",
        },
      ];

      // Simular delay de API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Buscar usuario hardcodeado
      const foundUser = hardcodedUsers.find(
        (user) =>
          user.email === credentials.email &&
          user.password === credentials.password
      );

      if (!foundUser) {
        throw new Error(
          "Credenciales inválidas. Usa: admin@example.com / admin2@example.com / tecnico@example.com / trabajador@example.com con password: 123456"
        );
      }

      // Simular respuesta de la API
      const response = {
        token: foundUser.token,
        usuario: foundUser.usuario,
      };

      // Guardar datos en localStorage
      apiUtils.setUserData(response.token, response.usuario);
      setUser(response.usuario);

      return response;

      // CÓDIGO ORIGINAL DE API
      /*
      const response = await authAPI.login(credentials);

      // Guardar datos en localStorage
      apiUtils.setUserData(response.token, response.usuario);
      setUser(response.usuario);

      return response;
      */
    } catch (error) {
      console.error("Error en login:", error);
      throw error;
    }
  };

  const logout = () => {
    authAPI.logout();
    setUser(null);
  };

  const isAuthenticated = () => {
    return apiUtils.isAuthenticated() && user !== null;
  };

  const hasRole = (role) => {
    return user?.rol === role;
  };

  const isAdmin = () => {
    return user?.rol === "ADMIN" || user?.rol === "SUPERADMIN";
  };

  const isSuperAdmin = () => {
    return user?.rol === "SUPERADMIN";
  };

  const isTecnico = () => {
    return user?.rol === "TECNICO";
  };

  const isTrabajador = () => {
    return user?.rol === "TRABAJADOR";
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated,
    hasRole,
    isAdmin,
    isSuperAdmin,
    isTecnico,
    isTrabajador,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
