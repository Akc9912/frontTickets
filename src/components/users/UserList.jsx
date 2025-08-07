import React, { useState } from "react";
import UserCard from "./UserCard";
import UserFilters from "./UserFilters";
import RefreshIcon from "@mui/icons-material/Refresh";

const UserList = ({
  users = [],
  loading = false,
  error = null,
  onRefresh,
  onCreate,
  onEdit,
  onDelete,
  onToggleStatus,
  onResetPassword,
  onChangeRole,
  userRole = "SuperAdmin",
  showFilters = true,
  showCreateButton = true,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    rol: "TODOS",
    estado: "TODOS",
  });
  const [expandedUser, setExpandedUser] = useState(null);

  const handleToggleExpansion = (userId) => {
    setExpandedUser(expandedUser === userId ? null : userId);
  };

  const filteredUsers = users.filter((user) => {
    // Filtro de búsqueda por texto
    const searchMatch =
      !searchTerm ||
      user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    // Filtro por rol
    const roleMatch =
      !filters.rol || filters.rol === "TODOS" || user.rol === filters.rol;

    // Filtro por estado
    const statusMatch =
      !filters.estado ||
      filters.estado === "TODOS" ||
      (filters.estado === "ACTIVO" && user.activo) ||
      (filters.estado === "INACTIVO" && !user.activo);

    return searchMatch && roleMatch && statusMatch;
  });

  return (
    <div>
      {/* Mensaje de error */}
      {error && (
        <div
          className="error-message"
          style={{
            backgroundColor: "#ffebee",
            color: "#c62828",
            padding: "12px",
            borderRadius: "4px",
            marginBottom: "20px",
            border: "1px solid #ef5350",
          }}
        >
          {error}
        </div>
      )}

      {/* Filtros */}
      {showFilters && (
        <UserFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filters={filters}
          onFilterChange={setFilters}
          onRefresh={onRefresh}
          onCreateUser={onCreate}
          loading={loading}
          showCreateButton={showCreateButton}
          userRole={userRole}
        />
      )}

      {/* Lista de usuarios */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <RefreshIcon
            style={{
              fontSize: "40px",
              color: "#2196f3",
              animation: "spin 1s linear infinite",
            }}
          />
          <p>Cargando usuarios...</p>
        </div>
      ) : (
        <div className="users-list-container">
          {filteredUsers.length === 0 ? (
            <div
              style={{ textAlign: "center", padding: "40px", color: "#666" }}
            >
              <p>
                No se encontraron usuarios que coincidan con los filtros
                aplicados.
              </p>
            </div>
          ) : (
            filteredUsers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                isExpanded={expandedUser === user.id}
                onToggleExpansion={handleToggleExpansion}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggleStatus={onToggleStatus}
                onResetPassword={onResetPassword}
                onChangeRole={onChangeRole}
                userRole={userRole}
                canDelete={userRole === "SuperAdmin" || userRole === "Admin"}
                canEdit={true}
                canToggleStatus={true}
                canChangeRole={
                  userRole === "SuperAdmin" || userRole === "Admin"
                }
              />
            ))
          )}
        </div>
      )}

      {/* Información de resultados */}
      <div className="table-footer">
        <p>
          Mostrando {filteredUsers.length} de {users.length} usuarios
        </p>
      </div>
    </div>
  );
};

export default UserList;
