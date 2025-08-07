import React from "react";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";
import UserList from "../components/users/UserList";
import { useUsers } from "../hooks/useUsers";

/**
 * Hook personalizado para gestión de usuarios con filtros específicos por rol
 */
export const useUserManagement = (userRole) => {
  const { user } = useAuth();
  const userHook = useUsers();

  // Aplicar filtros según el rol del usuario
  const getFilteredUsers = () => {
    switch (userRole) {
      case "SuperAdmin":
        // SuperAdmin ve todos los usuarios
        return userHook.users;

      case "Admin":
        // Admin no ve SuperAdmins
        return userHook.users.filter(
          (u) => u.rol !== "SUPERADMIN" && u.rol !== "SuperAdmin"
        );

      default:
        return [];
    }
  };

  // Configuración de permisos por rol
  const getPermissions = () => {
    switch (userRole) {
      case "SuperAdmin":
        return {
          canViewAll: true,
          canCreateAnyRole: true,
          canDeleteOthers: true,
          canManageSuperAdmins: false, // No puede eliminar otros SuperAdmins
        };

      case "Admin":
        return {
          canViewAll: false,
          canCreateAnyRole: false, // Solo roles permitidos
          canDeleteOthers: true,
          canManageSuperAdmins: false,
        };

      default:
        return {
          canViewAll: false,
          canCreateAnyRole: false,
          canDeleteOthers: false,
          canManageSuperAdmins: false,
        };
    }
  };

  // Función para cambiar el rol de un usuario
  const changeUserRole = async (userId, newRole) => {
    try {
      const response = await fetch(`/api/usuarios/${userId}/rol`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ rol: newRole }),
      });

      if (!response.ok) {
        throw new Error("Error al cambiar el rol del usuario");
      }

      const updatedUser = await response.json();

      // Actualizar la lista local
      userHook.setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === userId ? { ...u, rol: newRole } : u))
      );

      return updatedUser;
    } catch (error) {
      console.error("Error al cambiar rol:", error);
      throw error;
    }
  };

  return {
    ...userHook,
    filteredUsers: getFilteredUsers(),
    permissions: getPermissions(),
    currentUser: user,
    changeUserRole,
  };
};
