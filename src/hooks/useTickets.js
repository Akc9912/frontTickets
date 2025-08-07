import { useState, useEffect } from "react";
import { ticketsAPI, technicianAPI, apiUtils } from "../services/api";

export const useTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTickets = async () => {
    try {
      setLoading(true);
      setError(null);

      const ticketsData = await ticketsAPI.getAll();

      // Mapear estados de la API al formato del frontend - revisar
      const mappedTickets = ticketsData.map((ticket) => ({
        ...ticket,
        estado: apiUtils.mapTicketState(ticket.estado),
        creador: ticket.solicitante || ticket.creador,
        fechaUltimaActualizacion:
          ticket.fechaActualizacion || ticket.fechaUltimaActualizacion,
      }));

      setTickets(mappedTickets);
    } catch (err) {
      console.error("Error cargando tickets:", err);
      setError("Error al cargar los tickets. Por favor, intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const loadTechnicians = async () => {
    try {
      const techniciansData = await technicianAPI.getAll();
      setTechnicians(techniciansData);
    } catch (err) {
      console.error("Error cargando técnicos:", err);
    }
  };

  const updateTicket = async (ticketId, updateData) => {
    try {
      const updatedTicket = await ticketsAPI.update(ticketId, updateData);

      // Mapear estado de respuesta
      updatedTicket.estado = apiUtils.mapTicketState(updatedTicket.estado);
      updatedTicket.creador =
        updatedTicket.solicitante || updatedTicket.creador;
      updatedTicket.fechaUltimaActualizacion =
        updatedTicket.fechaActualizacion ||
        updatedTicket.fechaUltimaActualizacion;

      // Actualizar estado local
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket.id === ticketId ? updatedTicket : ticket
        )
      );

      return updatedTicket;
    } catch (error) {
      console.error("Error actualizando ticket:", error);
      throw error;
    }
  };

  const deleteTicket = async (ticketId) => {
    try {
      await ticketsAPI.delete(ticketId);
      setTickets((prevTickets) =>
        prevTickets.filter((ticket) => ticket.id !== ticketId)
      );
    } catch (error) {
      console.error("Error eliminando ticket:", error);
      throw error;
    }
  };

  const assignTechnician = async (ticketId, technicianId) => {
    try {
      await technicianAPI.assignTicket(technicianId, ticketId);
      // Recargar los tickets para obtener la asignación actualizada
      await loadTickets();
    } catch (error) {
      console.error("Error asignando técnico:", error);
      throw error;
    }
  };

  const createTicket = async (ticketData) => {
    try {
      const newTicket = await ticketsAPI.create(ticketData);

      // Mapear estado y agregar a la lista
      newTicket.estado = apiUtils.mapTicketState(newTicket.estado);
      newTicket.creador = newTicket.solicitante || newTicket.creador;

      setTickets((prevTickets) => [newTicket, ...prevTickets]);
      return newTicket;
    } catch (error) {
      console.error("Error creando ticket:", error);
      throw error;
    }
  };

  const refresh = () => {
    loadTickets();
    loadTechnicians();
  };

  useEffect(() => {
    loadTickets();
    loadTechnicians();
  }, []);

  return {
    tickets,
    technicians,
    loading,
    error,
    refresh,
    updateTicket,
    deleteTicket,
    assignTechnician,
    createTicket,
  };
};
