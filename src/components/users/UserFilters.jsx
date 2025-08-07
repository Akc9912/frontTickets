import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";

const UserFilters = ({
  searchTerm,
  onSearchChange,
  filters,
  onFilterChange,
  onRefresh,
  onCreateUser,
  loading = false,
  showCreateButton = true,
  userRole = "SuperAdmin",
}) => {
  const roles = [
    { value: "TODOS", label: "Todos los roles" },
    { value: "SuperAdmin", label: "Super Administrador" },
    { value: "Admin", label: "Administrador" },
    { value: "Tecnico", label: "Técnico" },
    { value: "Trabajador", label: "Trabajador" },
  ];

  const estados = [
    { value: "TODOS", label: "Todos los estados" },
    { value: "ACTIVO", label: "Activos" },
    { value: "INACTIVO", label: "Inactivos" },
  ];

  // Filtrar roles según permisos del usuario
  const availableRoles =
    userRole === "SuperAdmin"
      ? roles
      : roles.filter((role) => role.value !== "SuperAdmin");

  return (
    <div className="table-controls">
      <div className="search-section">
        <div className="search-box">
          <SearchIcon className="search-icon" />
          <input
            type="text"
            placeholder="Buscar por nombre o email..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
            disabled={loading}
          />
        </div>
      </div>

      <div
        className="filters-section"
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {/* Filtro por Rol */}
        <div className="filter-group">
          <FilterListIcon className="filter-icon" />
          <select
            value={filters.rol || "TODOS"}
            onChange={(e) =>
              onFilterChange({ ...filters, rol: e.target.value })
            }
            className="filter-select"
            disabled={loading}
          >
            {availableRoles.map((rol) => (
              <option key={rol.value} value={rol.value}>
                {rol.label}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro por Estado */}
        <div className="filter-group">
          <select
            value={filters.estado || "TODOS"}
            onChange={(e) =>
              onFilterChange({ ...filters, estado: e.target.value })
            }
            className="filter-select"
            disabled={loading}
          >
            {estados.map((estado) => (
              <option key={estado.value} value={estado.value}>
                {estado.label}
              </option>
            ))}
          </select>
        </div>

        {/* Botón de actualizar */}
        <button
          onClick={onRefresh}
          disabled={loading}
          className="btn-refresh"
          title="Actualizar usuarios"
          style={{
            padding: "8px 16px",
            backgroundColor: "#2196f3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.6 : 1,
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <RefreshIcon style={{ fontSize: "18px" }} />
          {loading ? "Cargando..." : "Actualizar"}
        </button>

        {/* Botón de crear usuario */}
        {showCreateButton && (
          <button
            onClick={onCreateUser}
            className="btn-create"
            title="Crear nuevo usuario"
            style={{
              padding: "8px 16px",
              backgroundColor: "#4caf50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <AddIcon style={{ fontSize: "18px" }} />
            Nuevo Usuario
          </button>
        )}
      </div>
    </div>
  );
};

export default UserFilters;
