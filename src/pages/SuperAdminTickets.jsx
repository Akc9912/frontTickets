import React from "react";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";
import TicketList from "../components/tickets/TicketList";
import { useTickets } from "../hooks/useTickets";

const SuperAdminTickets = () => {
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

  const handleEdit = (ticket) => {
    console.log("Editando ticket:", ticket);
    // TODO: Implementar modal de edición
  };

  const handleAssignTechnician = (ticket) => {
    console.log("Asignando técnico a ticket:", ticket);
    // TODO: Implementar modal de asignación de técnico
  };

  const handleChangeStatus = (ticket) => {
    console.log("Cambiando estado de ticket:", ticket);
    // TODO: Implementar modal de cambio de estado
  };

  const handleViewDetails = (ticket) => {
    console.log("Viendo detalles de ticket:", ticket);
    // TODO: Implementar modal de detalles o navegación
  };

  return (
    <Layout>
      <div className="dashboard">
        <div className="dashboard-header">
          <h2>Gestión de Tickets</h2>
          <p>Administra todos los tickets del sistema</p>
        </div>

        <div className="dashboard-content">
          <TicketList
            tickets={tickets}
            technicians={technicians}
            loading={loading}
            error={error}
            onRefresh={refresh}
            onEdit={handleEdit}
            onAssignTechnician={handleAssignTechnician}
            onChangeStatus={handleChangeStatus}
            onViewDetails={handleViewDetails}
            userRole={user?.rol || "SuperAdmin"}
          />
        </div>
      </div>
    </Layout>
  );
};

export default SuperAdminTickets;
