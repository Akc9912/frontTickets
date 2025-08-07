import React from "react";
import UserManagementPage from "../components/common/UserManagementPage";

/**
 * Factory para crear páginas de gestión de usuarios específicas
 * Permite customización avanzada sin duplicar código
 */
export const createUserManagementPage = (config) => {
  const {
    userRole,
    title = "Gestión de Usuarios",
    description,
    showAdvancedFeatures = false,
    customActions = {},
    beforeRender = null,
    afterRender = null,
  } = config;

  return () => {
    // Ejecutar lógica personalizada antes del render
    if (beforeRender) {
      beforeRender();
    }

    const pageComponent = (
      <UserManagementPage
        userRole={userRole}
        title={title}
        description={description}
        showAdvancedFeatures={showAdvancedFeatures}
        customActions={customActions}
      />
    );

    // Ejecutar lógica personalizada después del render
    if (afterRender) {
      afterRender();
    }

    return pageComponent;
  };
};

/**
 * Páginas pre-configuradas usando el factory
 */
export const SuperAdminUsersAdvanced = createUserManagementPage({
  userRole: "SuperAdmin",
  title: "Gestión Avanzada de Usuarios",
  showAdvancedFeatures: true,
  beforeRender: () => console.log("Cargando gestión SuperAdmin..."),
});

export const AdminUsersLimited = createUserManagementPage({
  userRole: "Admin",
  title: "Gestión de Usuarios - Vista Admin",
  description: "Gestión limitada para administradores de área",
  showAdvancedFeatures: false,
});

/**
 * Ejemplos de uso especializado (para futuras implementaciones)
 */
export const DepartmentUserManagement = createUserManagementPage({
  userRole: "Admin",
  title: "Gestión por Departamento",
  description: "Usuarios del departamento específico",
  customActions: {
    onUserCreated: (user) => console.log("Usuario creado:", user),
    onUserDeleted: (userId) => console.log("Usuario eliminado:", userId),
  },
});

export const AuditUserManagement = createUserManagementPage({
  userRole: "SuperAdmin",
  title: "Auditoría de Usuarios",
  description: "Vista de auditoría con información detallada",
  showAdvancedFeatures: true,
  beforeRender: () => {
    // Lógica de auditoría
    console.log("Iniciando auditoría de usuarios...");
  },
});
