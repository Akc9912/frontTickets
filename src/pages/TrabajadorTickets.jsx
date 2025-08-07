import React from "react";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";
import TicketList from "../components/tickets/TicketList";
import { useTickets } from "../hooks/useTickets";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

const TrabajadorTickets = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
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

  // Filtrar solo los tickets creados por el trabajador actual
  const myTickets = tickets.filter(
    (ticket) =>
      ticket.creador?.id === user?.id ||
      ticket.creador?.email === user?.email ||
      ticket.solicitante?.id === user?.id ||
      ticket.solicitante?.email === user?.email
  );

  const handleEdit = (ticket) => {
    // Los trabajadores pueden editar solo si el ticket no está asignado
    if (ticket.estado === "NO_ASIGNADO" || ticket.estado === "ABIERTO") {
      console.log("Trabajador editando ticket:", ticket);
      // TODO: Modal de edición limitada
    } else {
      alert("No puedes editar un ticket que ya está en proceso");
    }
  };

  const handleAssignTechnician = (ticket) => {
    // Los trabajadores no pueden asignar técnicos
    console.log("Trabajadores no pueden asignar técnicos");
  };

  const handleChangeStatus = (ticket) => {
    // Los trabajadores solo pueden cerrar tickets resueltos
    if (ticket.estado === "RESUELTO") {
      console.log("Trabajador cerrando ticket resuelto:", ticket);
      // TODO: Confirmar cierre del ticket
    } else {
      console.log("Trabajadores solo pueden cerrar tickets resueltos");
    }
  };

  const handleViewDetails = (ticket) => {
    console.log("Trabajador viendo detalles de ticket:", ticket);
    // TODO: Modal de detalles con historial
  };

  const handleCreateTicket = () => {
    navigate("/create-ticket");
  };

  return (
    <Layout>
      <div className="dashboard">
        <div className="dashboard-header">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h2>Mis Tickets</h2>
              <p>Gestiona los tickets que has creado</p>
            </div>
            <button
              onClick={handleCreateTicket}
              style={{
                padding: "10px 20px",
                backgroundColor: "#4caf50",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              <AddIcon style={{ fontSize: "18px" }} />
              Crear Nuevo Ticket
            </button>
          </div>
        </div>

        <div className="dashboard-content">
          <TicketList
            tickets={myTickets}
            technicians={[]} // Los trabajadores no ven técnicos
            loading={loading}
            error={error}
            onRefresh={refresh}
            onEdit={handleEdit}
            onAssignTechnician={handleAssignTechnician}
            onChangeStatus={handleChangeStatus}
            onViewDetails={handleViewDetails}
            userRole={user?.rol || "Trabajador"}
            showTechnicianFilter={false} // No necesario
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
                No has creado ningún ticket aún
              </h3>
              <p style={{ color: "#888", marginBottom: "20px" }}>
                Crea tu primer ticket para reportar un problema o solicitar
                ayuda.
              </p>
              <button
                onClick={handleCreateTicket}
                style={{
                  padding: "12px 24px",
                  backgroundColor: "#2196f3",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                <AddIcon style={{ fontSize: "20px" }} />
                Crear Primer Ticket
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default TrabajadorTickets;
