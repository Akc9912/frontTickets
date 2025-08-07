import React from "react";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";
import TicketList from "../components/tickets/TicketList";
import { useTickets } from "../hooks/useTickets";

const AdminTickets = () => {
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

  // Filtrar tickets del área del admin (en desarrollo, mostrar todos)
  const adminAreaTickets = tickets; // TODO: Filtrar por área del admin cuando esté implementado

  // Filtrar técnicos del área del admin
  const adminAreaTechnicians = technicians.filter(
    (tech) =>
      // En desarrollo, mostrar todos. TODO: Filtrar por área
      true
  );

  const handleEdit = (ticket) => {
    console.log("Admin editando ticket:", ticket);
    // TODO: Implementar modal de edición con permisos de admin
  };

  const handleAssignTechnician = (ticket) => {
    console.log("Admin asignando técnico a ticket:", ticket);
    // TODO: Implementar modal de asignación (solo técnicos de su área)
  };

  const handleChangeStatus = (ticket) => {
    console.log("Admin cambiando estado de ticket:", ticket);
    // TODO: Implementar modal de cambio de estado (estados limitados para admin)
  };

  const handleViewDetails = (ticket) => {
    console.log("Admin viendo detalles de ticket:", ticket);
    // TODO: Implementar modal de detalles
  };

  return (
    <Layout>
      <div className="dashboard">
        <div className="dashboard-header">
          <h2>Gestión de Tickets - Área de {user?.nombre}</h2>
          <p>Administra los tickets de tu área y asigna técnicos</p>
        </div>

        <div className="dashboard-content">
          <TicketList
            tickets={adminAreaTickets}
            technicians={adminAreaTechnicians}
            loading={loading}
            error={error}
            onRefresh={refresh}
            onEdit={handleEdit}
            onAssignTechnician={handleAssignTechnician}
            onChangeStatus={handleChangeStatus}
            onViewDetails={handleViewDetails}
            userRole={user?.rol || "Admin"}
            showTechnicianFilter={true}
            showPriorityFilter={true}
            showCategoryFilter={true}
          />
        </div>
      </div>
    </Layout>
  );
};

export default AdminTickets;
