import React from "react";
import UserManagementPage from "../components/common/UserManagementPage";

/**
 * Página de gestión de usuarios para Admin
 * Utiliza el componente base modular con configuración específica
 */
const AdminUsers = () => {
  return (
    <UserManagementPage
      userRole="Admin"
      title="Gestión de Usuarios"
      showAdvancedFeatures={false} // Cambiar a true para info de debugging
    />
  );
};

export default AdminUsers;
