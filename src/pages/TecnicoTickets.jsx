import React from "react";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";
import TicketList from "../components/tickets/TicketList";
import { useTickets } from "../hooks/useTickets";

const TecnicoTickets = () => {
  const { user } = useAuth();
  const {
    tickets,
    technicians,
    loading,
    error,
    refresh,
    updateTicket,
    deleteTicket,
    assignTechnician,
  } = useTickets();

  // Filtrar solo los tickets asignados al técnico actual
  const myTickets = tickets.filter(
    (ticket) =>
      ticket.tecnicoAsignado?.id === user?.id ||
      ticket.tecnicoAsignado?.email === user?.email
  );

  const handleEdit = (ticket) => {
    console.log("Técnico editando ticket:", ticket);
    // Los técnicos pueden editar comentarios/notas, no datos principales
  };

  const handleAssignTechnician = (ticket) => {
    // Los técnicos no pueden reasignar tickets
    console.log("Técnicos no pueden reasignar tickets");
  };

  const handleChangeStatus = (ticket) => {
    console.log("Técnico cambiando estado de ticket:", ticket);
    // TODO: Modal con estados limitados: EN_PROGRESO -> RESUELTO, ASIGNADO -> EN_PROGRESO
  };

  const handleViewDetails = (ticket) => {
    console.log("Técnico viendo detalles de ticket:", ticket);
    // TODO: Modal de detalles con historial
  };

  return (
    <Layout>
      <div className="dashboard">
        <div className="dashboard-header">
          <h2>Mis Tickets Asignados</h2>
          <p>Gestiona los tickets que tienes asignados</p>
        </div>

        <div className="dashboard-content">
          <TicketList
            tickets={myTickets}
            technicians={[]} // Los técnicos no ven lista de técnicos
            loading={loading}
            error={error}
            onRefresh={refresh}
            onEdit={handleEdit}
            onAssignTechnician={handleAssignTechnician}
            onChangeStatus={handleChangeStatus}
            onViewDetails={handleViewDetails}
            userRole={user?.rol || "Tecnico"}
            showTechnicianFilter={false} // No necesario, solo ven sus tickets
            showPriorityFilter={true}
            showCategoryFilter={true}
          />

          {myTickets.length === 0 && !loading && (
            <div
              style={{
                textAlign: "center",
                padding: "40px",
                backgroundColor: "#f5f5f5",
                borderRadius: "8px",
                margin: "20px 0",
              }}
            >
              <h3 style={{ color: "#666", marginBottom: "10px" }}>
                No tienes tickets asignados
              </h3>
              <p style={{ color: "#888" }}>
                Los tickets aparecerán aquí cuando un administrador te los
                asigne.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default TecnicoTickets;
