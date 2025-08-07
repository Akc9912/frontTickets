import { useState, useEffect } from "react";
import { usersAPI, apiUtils } from "../services/api";

export const useUsers = (filterByRole = null) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const usersData = await usersAPI.getAll();

      // Filtrar por rol si se especifica
      const filteredUsers = filterByRole
        ? usersData.filter((user) => user.rol === filterByRole)
        : usersData;

      setUsers(filteredUsers);
    } catch (err) {
      console.error("Error cargando usuarios:", err);
      setError("Error al cargar los usuarios. Por favor, intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (userData) => {
    try {
      const newUser = await usersAPI.create(userData);
      setUsers((prevUsers) => [newUser, ...prevUsers]);
      return newUser;
    } catch (error) {
      console.error("Error creando usuario:", error);
      throw error;
    }
  };

  const updateUser = async (userId, updateData) => {
    try {
      const updatedUser = await usersAPI.update(userId, updateData);

      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === userId ? updatedUser : user))
      );

      return updatedUser;
    } catch (error) {
      console.error("Error actualizando usuario:", error);
      throw error;
    }
  };

  const deleteUser = async (userId) => {
    try {
      await usersAPI.delete(userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error eliminando usuario:", error);
      throw error;
    }
  };

  const toggleUserStatus = async (userId, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      await updateUser(userId, { activo: newStatus });
      return newStatus;
    } catch (error) {
      console.error("Error cambiando estado del usuario:", error);
      throw error;
    }
  };

  const resetPassword = async (userId) => {
    try {
      // Backend resetea el pass, ver como llamar al metodo
      console.log("Reseteando contraseña para usuario:", userId);
      // const result = await usersAPI.resetPassword(userId);
      // return result; ??
    } catch (error) {
      console.error("Error reseteando contraseña:", error);
      throw error;
    }
  };

  const refresh = () => {
    loadUsers();
  };

  useEffect(() => {
    loadUsers();
  }, [filterByRole]);

  return {
    users,
    loading,
    error,
    refresh,
    createUser,
    updateUser,
    deleteUser,
    toggleUserStatus,
    resetPassword,
  };
};
