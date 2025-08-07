// Mapeo de iconos por estado - devuelve información para crear el icono
export const getEstadoIcon = (estado) => {
  switch (estado) {
    case "NO_ASIGNADO":
    case "ABIERTO":
      return { icon: "Assignment", color: "#ff9800" };
    case "ASIGNADO":
    case "EN_PROGRESO":
      return { icon: "AssignmentInd", color: "#2196f3" };
    case "REABIERTO":
      return { icon: "Refresh", color: "#ff5722" };
    case "RESUELTO":
      return { icon: "CheckCircle", color: "#4caf50" };
    case "FINALIZADO":
    case "CERRADO":
      return { icon: "TaskAlt", color: "#9c27b0" };
    default:
      return { icon: "ConfirmationNumber", color: "#757575" };
  }
};

// Mapeo de etiquetas por estado
export const getEstadoLabel = (estado) => {
  switch (estado) {
    case "NO_ASIGNADO":
      return "No Asignado";
    case "ABIERTO":
      return "Abierto";
    case "ASIGNADO":
      return "Asignado";
    case "EN_PROGRESO":
      return "En Progreso";
    case "REABIERTO":
      return "Reabierto";
    case "RESUELTO":
      return "Resuelto";
    case "FINALIZADO":
      return "Finalizado";
    case "CERRADO":
      return "Cerrado";
    default:
      return estado;
  }
};

// Mapeo de colores por estado
export const getEstadoColor = (estado) => {
  switch (estado) {
    case "NO_ASIGNADO":
    case "ABIERTO":
      return "#ff9800";
    case "ASIGNADO":
    case "EN_PROGRESO":
      return "#2196f3";
    case "REABIERTO":
      return "#ff5722";
    case "RESUELTO":
      return "#4caf50";
    case "FINALIZADO":
    case "CERRADO":
      return "#9c27b0";
    default:
      return "#757575";
  }
};

// Mapeo de prioridades
export const getPrioridadColor = (prioridad) => {
  switch (prioridad) {
    case "BAJA":
      return "#4caf50";
    case "MEDIA":
      return "#ff9800";
    case "ALTA":
      return "#ff5722";
    case "CRITICA":
      return "#f44336";
    default:
      return "#757575";
  }
};

export const getPrioridadLabel = (prioridad) => {
  switch (prioridad) {
    case "BAJA":
      return "Baja";
    case "MEDIA":
      return "Media";
    case "ALTA":
      return "Alta";
    case "CRITICA":
      return "Crítica";
    default:
      return prioridad;
  }
};

// Mapeo de colores por rol de usuario
export const getRoleColor = (role) => {
  switch (role) {
    case "SUPERADMIN":
    case "SuperAdmin":
      return "#9c27b0"; // Púrpura
    case "ADMIN":
    case "Admin":
      return "#f44336"; // Rojo
    case "TECNICO":
    case "Tecnico":
      return "#2196f3"; // Azul
    case "TRABAJADOR":
    case "Trabajador":
      return "#ff9800"; // Amarillo/Naranja
    default:
      return "#757575"; // Gris
  }
};

// Mapeo de etiquetas por rol de usuario
export const getRoleLabel = (role) => {
  switch (role) {
    case "SUPERADMIN":
    case "SuperAdmin":
      return "SuperAdmin";
    case "ADMIN":
    case "Admin":
      return "Administrador";
    case "TECNICO":
    case "Tecnico":
      return "Técnico";
    case "TRABAJADOR":
    case "Trabajador":
      return "Trabajador";
    default:
      return role;
  }
};

// Mapeo de categorías
export const getCategoriaLabel = (categoria) => {
  switch (categoria) {
    case "SOFTWARE":
      return "Software";
    case "HARDWARE":
      return "Hardware";
    case "NETWORK":
      return "Red/Conectividad";
    case "ACCESO":
      return "Control de Acceso";
    case "OTROS":
      return "Otros";
    default:
      return categoria;
  }
};

// Estados disponibles según el rol del usuario
export const getAvailableStates = (currentState, userRole) => {
  const baseStates = {
    NO_ASIGNADO: ["ASIGNADO", "CERRADO"],
    ABIERTO: ["ASIGNADO", "EN_PROGRESO", "CERRADO"],
    ASIGNADO: ["EN_PROGRESO", "RESUELTO", "REABIERTO"],
    EN_PROGRESO: ["RESUELTO", "REABIERTO", "ASIGNADO"],
    REABIERTO: ["ASIGNADO", "EN_PROGRESO", "RESUELTO"],
    RESUELTO: ["CERRADO", "REABIERTO"],
    CERRADO: ["REABIERTO"],
  };

  if (userRole === "Tecnico") {
    // Los técnicos solo pueden cambiar ciertos estados
    const technicanStates = {
      ASIGNADO: ["EN_PROGRESO"],
      EN_PROGRESO: ["RESUELTO"],
      REABIERTO: ["EN_PROGRESO"],
    };
    return technicanStates[currentState] || [];
  }

  return baseStates[currentState] || [];
};

// Formatear fecha y hora
export const formatDateTime = (dateTimeStr) => {
  if (!dateTimeStr) return "N/A";

  const date = new Date(dateTimeStr);
  return date.toLocaleString("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Formatear solo fecha
export const formatDate = (dateStr) => {
  if (!dateStr) return "N/A";

  const date = new Date(dateStr);
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

// Validar datos de ticket
export const validateTicketData = (ticketData) => {
  const errors = {};

  if (!ticketData.titulo || ticketData.titulo.trim().length < 5) {
    errors.titulo = "El título debe tener al menos 5 caracteres";
  }

  if (!ticketData.descripcion || ticketData.descripcion.trim().length < 10) {
    errors.descripcion = "La descripción debe tener al menos 10 caracteres";
  }

  if (!ticketData.categoria) {
    errors.categoria = "Debe seleccionar una categoría";
  }

  if (!ticketData.prioridad) {
    errors.prioridad = "Debe seleccionar una prioridad";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Filtrar tickets según criterios
export const filterTickets = (tickets, filters) => {
  return tickets.filter((ticket) => {
    // Filtro de búsqueda por texto
    const searchMatch =
      !filters.searchTerm ||
      ticket.titulo.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      ticket.descripcion
        .toLowerCase()
        .includes(filters.searchTerm.toLowerCase()) ||
      (ticket.creador?.nombre || ticket.solicitante?.nombre || "")
        .toLowerCase()
        .includes(filters.searchTerm.toLowerCase());

    // Filtro por estado
    const stateMatch =
      !filters.estado ||
      filters.estado === "TODOS" ||
      ticket.estado === filters.estado;

    // Filtro por prioridad
    const priorityMatch =
      !filters.prioridad ||
      filters.prioridad === "TODAS" ||
      ticket.prioridad === filters.prioridad;

    // Filtro por categoría
    const categoryMatch =
      !filters.categoria ||
      filters.categoria === "TODAS" ||
      ticket.categoria === filters.categoria;

    // Filtro por técnico asignado
    const technicianMatch =
      !filters.tecnico ||
      filters.tecnico === "TODOS" ||
      (filters.tecnico === "SIN_ASIGNAR"
        ? !ticket.tecnicoAsignado
        : ticket.tecnicoAsignado?.id == filters.tecnico);

    return (
      searchMatch &&
      stateMatch &&
      priorityMatch &&
      categoryMatch &&
      technicianMatch
    );
  });
};
