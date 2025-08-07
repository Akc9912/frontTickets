import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import RefreshIcon from "@mui/icons-material/Refresh";

const TicketFilters = ({
  searchTerm,
  onSearchChange,
  filters,
  onFilterChange,
  onRefresh,
  loading = false,
  technicians = [],
  showTechnicianFilter = true,
  showPriorityFilter = true,
  showCategoryFilter = true,
}) => {
  const estados = [
    { value: "TODOS", label: "Todos los estados" },
    { value: "NO_ASIGNADO", label: "No Asignado" },
    { value: "ABIERTO", label: "Abierto" },
    { value: "ASIGNADO", label: "Asignado" },
    { value: "EN_PROGRESO", label: "En Progreso" },
    { value: "REABIERTO", label: "Reabierto" },
    { value: "RESUELTO", label: "Resuelto" },
    { value: "CERRADO", label: "Cerrado" },
  ];

  const prioridades = [
    { value: "TODAS", label: "Todas las prioridades" },
    { value: "BAJA", label: "Baja" },
    { value: "MEDIA", label: "Media" },
    { value: "ALTA", label: "Alta" },
    { value: "CRITICA", label: "Crítica" },
  ];

  const categorias = [
    { value: "TODAS", label: "Todas las categorías" },
    { value: "SOFTWARE", label: "Software" },
    { value: "HARDWARE", label: "Hardware" },
    { value: "NETWORK", label: "Red/Conectividad" },
    { value: "ACCESO", label: "Control de Acceso" },
    { value: "OTROS", label: "Otros" },
  ];

  return (
    <div className="table-controls">
      <div className="search-section">
        <div className="search-box">
          <SearchIcon className="search-icon" />
          <input
            type="text"
            placeholder="Buscar por título, descripción o solicitante..."
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
        {/* Filtro por Estado */}
        <div className="filter-group">
          <FilterListIcon className="filter-icon" />
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

        {/* Filtro por Prioridad */}
        {showPriorityFilter && (
          <div className="filter-group">
            <select
              value={filters.prioridad || "TODAS"}
              onChange={(e) =>
                onFilterChange({ ...filters, prioridad: e.target.value })
              }
              className="filter-select"
              disabled={loading}
            >
              {prioridades.map((prioridad) => (
                <option key={prioridad.value} value={prioridad.value}>
                  {prioridad.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Filtro por Categoría */}
        {showCategoryFilter && (
          <div className="filter-group">
            <select
              value={filters.categoria || "TODAS"}
              onChange={(e) =>
                onFilterChange({ ...filters, categoria: e.target.value })
              }
              className="filter-select"
              disabled={loading}
            >
              {categorias.map((categoria) => (
                <option key={categoria.value} value={categoria.value}>
                  {categoria.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Filtro por Técnico */}
        {showTechnicianFilter && (
          <div className="filter-group">
            <select
              value={filters.tecnico || "TODOS"}
              onChange={(e) =>
                onFilterChange({ ...filters, tecnico: e.target.value })
              }
              className="filter-select"
              disabled={loading}
            >
              <option value="TODOS">Todos los técnicos</option>
              <option value="SIN_ASIGNAR">Sin asignar</option>
              {technicians.map((tecnico) => (
                <option key={tecnico.id} value={tecnico.id}>
                  {tecnico.nombre}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Botón de actualizar */}
        <button
          onClick={onRefresh}
          disabled={loading}
          className="btn-refresh"
          title="Actualizar tickets"
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
      </div>
    </div>
  );
};

export default TicketFilters;
