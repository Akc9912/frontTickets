import React from "react";
import UserManagementPage from "../components/common/UserManagementPage";

/**
 * Página de gestión de usuarios para SuperAdmin
 * Utiliza el componente base modular con configuración específica
 */
const SuperAdminUsers = () => {
  return (
    <UserManagementPage
      userRole="SuperAdmin"
      title="Gestión de Usuarios"
      showAdvancedFeatures={false} // Cambiar a true para info de debugging
    />
  );
};

export default SuperAdminUsers;
