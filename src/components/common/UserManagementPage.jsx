import React from "react";
import Layout from "../Layout";
import UserList from "../users/UserList";
import { useUserManagement } from "../../hooks/useUserManagement";

/**
 * Componente base reutilizable para gestión de usuarios
 * Se adapta automáticamente según el rol del usuario
 */
const UserManagementPage = ({
  userRole,
  title = "Gestión de Usuarios",
  description = "Administra usuarios del sistema",
  showAdvancedFeatures = false,
}) => {
  const {
    filteredUsers,
    loading,
    error,
    refresh,
    createUser,
    updateUser,
    deleteUser,
    toggleUserStatus,
    resetPassword,
    changeUserRole,
    permissions,
    currentUser,
  } = useUserManagement(userRole);

  // Personalizar descripción según el rol
  const getDescription = () => {
    switch (userRole) {
      case "SuperAdmin":
        return "Administra todos los usuarios del sistema";
      case "Admin":
        return "Administra usuarios de tu área (Admins, Técnicos y Trabajadores)";
      default:
        return description;
    }
  };

  return (
    <Layout userRole={currentUser?.rol}>
      <div className="page-container">
        <div className="page-header">
          <h1>{title}</h1>
          <p>{getDescription()}</p>

          {/* Información adicional para debugging/admin */}
          {showAdvancedFeatures && permissions && (
            <div
              className="admin-info"
              style={{
                backgroundColor: "#f5f5f5",
                padding: "8px 12px",
                borderRadius: "4px",
                fontSize: "12px",
                color: "#666",
                marginTop: "8px",
              }}
            >
              Usuarios visibles: {filteredUsers.length} | Rol: {userRole} |
              Permisos:{" "}
              {Object.entries(permissions)
                .filter(([key, value]) => value)
                .map(([key]) => key)
                .join(", ") || "Limitados"}
            </div>
          )}
        </div>

        <div className="page-content">
          <UserList
            users={filteredUsers}
            loading={loading}
            error={error}
            onRefresh={refresh}
            onCreate={createUser}
            onEdit={updateUser}
            onDelete={deleteUser}
            onToggleStatus={toggleUserStatus}
            onResetPassword={resetPassword}
            onChangeRole={changeUserRole}
            userRole={userRole}
            showFilters={true}
            showCreateButton={permissions?.canCreateAnyRole !== false}
          />
        </div>
      </div>
    </Layout>
  );
};

export default UserManagementPage;
