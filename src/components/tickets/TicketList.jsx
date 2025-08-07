import React, { useState } from "react";
import TicketCard from "./TicketCard";
import TicketFilters from "./TicketFilters";
import RefreshIcon from "@mui/icons-material/Refresh";
import { filterTickets } from "../../utils/ticketUtils";

const TicketList = ({
  tickets = [],
  technicians = [],
  loading = false,
  error = null,
  onRefresh,
  onEdit,
  onAssignTechnician,
  onChangeStatus,
  onViewDetails,
  userRole = "SuperAdmin",
  showFilters = true,
  showTechnicianFilter = true,
  showPriorityFilter = true,
  showCategoryFilter = true,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    estado: "TODOS",
    prioridad: "TODAS",
    categoria: "TODAS",
    tecnico: "TODOS",
  });
  const [expandedTicket, setExpandedTicket] = useState(null);

  const handleToggleExpansion = (ticketId) => {
    setExpandedTicket(expandedTicket === ticketId ? null : ticketId);
  };

  const filteredTickets = filterTickets(tickets, {
    searchTerm,
    ...filters,
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
        <TicketFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filters={filters}
          onFilterChange={setFilters}
          onRefresh={onRefresh}
          loading={loading}
          technicians={technicians}
          showTechnicianFilter={showTechnicianFilter}
          showPriorityFilter={showPriorityFilter}
          showCategoryFilter={showCategoryFilter}
        />
      )}

      {/* Lista de tickets */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <RefreshIcon
            style={{
              fontSize: "40px",
              color: "#2196f3",
              animation: "spin 1s linear infinite",
            }}
          />
          <p>Cargando tickets...</p>
        </div>
      ) : (
        <div className="users-list-container">
          {filteredTickets.length === 0 ? (
            <div
              style={{ textAlign: "center", padding: "40px", color: "#666" }}
            >
              <p>
                No se encontraron tickets que coincidan con los filtros
                aplicados.
              </p>
            </div>
          ) : (
            filteredTickets.map((ticket) => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                isExpanded={expandedTicket === ticket.id}
                onToggleExpansion={handleToggleExpansion}
                onEdit={onEdit}
                onAssignTechnician={onAssignTechnician}
                onChangeStatus={onChangeStatus}
                onViewDetails={onViewDetails}
                userRole={userRole}
              />
            ))
          )}
        </div>
      )}

      {/* Información de resultados */}
      <div className="table-footer">
        <p>
          Mostrando {filteredTickets.length} de {tickets.length} tickets
        </p>
      </div>
    </div>
  );
};

export default TicketList;
