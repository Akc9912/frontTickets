// Configuración base de la API
const API_BASE_URL = "http://localhost:8080/api";

// MODO DESARROLLO - Cambiar a false cuando el backend esté conectado o eliminar si ya no se usa
const DEVELOPMENT_MODE = true;

// Datos hardcodeados para desarrollo
const MOCK_DATA = {
  tickets: [
    {
      id: 1,
      titulo: "Problema con conexión a red",
      descripcion:
        "No se puede acceder a los recursos compartidos de la empresa desde mi equipo. He intentado reiniciar pero el problema persiste.",
      estado: "ABIERTO",
      prioridad: "MEDIA",
      categoria: "NETWORK",
      fechaCreacion: "2024-08-06T09:30:00",
      fechaActualizacion: "2024-08-06T09:30:00",
      solicitante: {
        id: 4,
        nombre: "María Trabajadora",
        email: "trabajador@example.com",
      },
      tecnicoAsignado: null,
    },
    {
      id: 2,
      titulo: "Error en aplicación contable",
      descripcion:
        "La aplicación se cierra inesperadamente al intentar generar reportes mensuales. Error recurrente desde esta semana.",
      estado: "EN_PROGRESO",
      prioridad: "ALTA",
      categoria: "SOFTWARE",
      fechaCreacion: "2024-08-05T14:15:00",
      fechaActualizacion: "2024-08-06T10:00:00",
      solicitante: {
        id: 4,
        nombre: "María Trabajadora",
        email: "trabajador@example.com",
      },
      tecnicoAsignado: {
        id: 3,
        nombre: "Carlos Técnico",
        email: "tecnico@example.com",
      },
    },
    {
      id: 3,
      titulo: "Solicitud de nuevo software",
      descripcion:
        "Necesito instalación de software de diseño gráfico para el departamento de marketing. Preferiblemente Adobe Creative Suite.",
      estado: "REABIERTO",
      prioridad: "BAJA",
      categoria: "SOFTWARE",
      fechaCreacion: "2024-08-04T11:20:00",
      fechaActualizacion: "2024-08-06T16:45:00",
      solicitante: {
        id: 4,
        nombre: "María Trabajadora",
        email: "trabajador@example.com",
      },
      tecnicoAsignado: {
        id: 3,
        nombre: "Carlos Técnico",
        email: "tecnico@example.com",
      },
    },
    {
      id: 4,
      titulo: "Impresora no funciona",
      descripcion:
        "La impresora del piso 3 no responde. Se enciende pero no imprime ningún documento enviado desde las computadoras.",
      estado: "RESUELTO",
      prioridad: "MEDIA",
      categoria: "HARDWARE",
      fechaCreacion: "2024-08-03T08:45:00",
      fechaActualizacion: "2024-08-05T17:30:00",
      solicitante: {
        id: 4,
        nombre: "María Trabajadora",
        email: "trabajador@example.com",
      },
      tecnicoAsignado: {
        id: 3,
        nombre: "Carlos Técnico",
        email: "tecnico@example.com",
      },
    },
    {
      id: 5,
      titulo: "Lentitud en el sistema",
      descripcion:
        "El sistema de gestión está muy lento desde ayer. Las consultas tardan más de 30 segundos en cargar.",
      estado: "CERRADO",
      prioridad: "CRITICA",
      categoria: "SOFTWARE",
      fechaCreacion: "2024-08-02T13:10:00",
      fechaActualizacion: "2024-08-04T12:00:00",
      solicitante: {
        id: 4,
        nombre: "María Trabajadora",
        email: "trabajador@example.com",
      },
      tecnicoAsignado: {
        id: 3,
        nombre: "Carlos Técnico",
        email: "tecnico@example.com",
      },
    },
  ],
  users: [
    {
      id: 1,
      nombre: "Super Administrador",
      email: "admin@example.com",
      rol: "SUPERADMIN",
      fechaCreacion: "2025-01-15T10:30:00",
      activo: true,
    },
    {
      id: 2,
      nombre: "Administrador",
      email: "admin2@example.com",
      rol: "ADMIN",
      fechaCreacion: "2025-02-15T10:30:00",
      activo: true,
    },
    {
      id: 3,
      nombre: "Carlos Técnico",
      email: "tecnico@example.com",
      rol: "TECNICO",
      fechaCreacion: "2025-03-15T10:30:00",
      activo: true,
    },
    {
      id: 4,
      nombre: "María Trabajadora",
      email: "trabajador@example.com",
      rol: "TRABAJADOR",
      fechaCreacion: "2025-04-15T10:30:00",
      activo: true,
    },
    {
      id: 5,
      nombre: "Ana García",
      email: "ana.garcia@empresa.com",
      rol: "TRABAJADOR",
      fechaCreacion: "2025-05-01T09:15:00",
      activo: true,
    },
    {
      id: 6,
      nombre: "Luis Rodríguez",
      email: "luis.rodriguez@empresa.com",
      rol: "TRABAJADOR",
      fechaCreacion: "2025-05-02T10:20:00",
      activo: false,
    },
    {
      id: 7,
      nombre: "Segundo SuperAdmin",
      email: "superadmin2@example.com",
      rol: "SUPERADMIN",
      fechaCreacion: "2025-01-20T11:00:00",
      activo: true,
    },
    {
      id: 8,
      nombre: "Pedro Admin",
      email: "pedro.admin@empresa.com",
      rol: "ADMIN",
      fechaCreacion: "2025-03-01T14:30:00",
      activo: true,
    },
    {
      id: 9,
      nombre: "Laura Técnica",
      email: "laura.tecnica@empresa.com",
      rol: "TECNICO",
      fechaCreacion: "2025-04-10T08:45:00",
      activo: true,
    },
  ],
  statistics: {
    totalTickets: 156,
    ticketsAbiertos: 23,
    ticketsEnProgreso: 45,
    ticketsResueltos: 68,
    ticketsCerrados: 20,
    ticketsPorEstado: {
      ABIERTO: 23,
      EN_PROGRESO: 45,
      REABIERTO: 12,
      RESUELTO: 68,
      CERRADO: 8,
    },
    ticketsPorPrioridad: {
      // no va
      CRITICA: 2,
      ALTA: 8,
      MEDIA: 35,
      BAJA: 111,
    },
    ticketsPorCategoria: {
      // no va
      SOFTWARE: 75,
      HARDWARE: 45,
      NETWORK: 20,
      OTHER: 16,
    },
  },
};

// Obtener el token de autenticación desde localStorage
const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

// Configuración de headers por defecto
const getHeaders = (includeAuth = true) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  return headers;
};

// Manejo de respuestas HTTP
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }

  // Si la respuesta es 204 (No Content), retornar null
  if (response.status === 204) {
    return null;
  }

  return response.json();
};

// Función genérica para hacer peticiones HTTP

const makeRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: getHeaders(options.includeAuth !== false),
    ...options,
  };

  try {
    const response = await fetch(url, config);
    return await handleResponse(response);
  } catch (error) {
    console.error(`Error en petición a ${endpoint}:`, error);
    throw error;
  }
};

//  AUTENTICACIÓN

export const authAPI = {
  // Iniciar sesión
  login: async (credentials) => {
    return makeRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
      includeAuth: false,
    });
  },

  // Cerrar sesión (limpia el token local)
  logout: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  },
};

// GESTIÓN DE TICKETS

export const ticketsAPI = {
  // Obtener lista de tickets
  getAll: async () => {
    if (DEVELOPMENT_MODE) {
      // Simular delay de red
      await new Promise((resolve) => setTimeout(resolve, 800));
      return [...MOCK_DATA.tickets];
    }
    return makeRequest("/tickets");
  },

  // Obtener ticket por ID
  getById: async (id) => {
    if (DEVELOPMENT_MODE) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const ticket = MOCK_DATA.tickets.find((t) => t.id === parseInt(id));
      if (!ticket) throw new Error(`Ticket con ID ${id} no encontrado`);
      return ticket;
    }
    return makeRequest(`/tickets/${id}`);
  },

  // Crear nuevo ticket
  create: async (ticketData) => {
    if (DEVELOPMENT_MODE) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const newTicket = {
        id: Math.max(...MOCK_DATA.tickets.map((t) => t.id)) + 1,
        ...ticketData,
        estado: "ABIERTO",
        fechaCreacion: new Date().toISOString(),
        fechaActualizacion: new Date().toISOString(),
        solicitante: {
          id: 4,
          nombre: "María Trabajadora",
          email: "trabajador@example.com",
        },
        tecnicoAsignado: null,
      };
      MOCK_DATA.tickets.push(newTicket);
      return newTicket;
    }
    return makeRequest("/tickets", {
      method: "POST",
      body: JSON.stringify(ticketData),
    });
  },

  // Actualizar ticket
  update: async (id, updateData) => {
    if (DEVELOPMENT_MODE) {
      await new Promise((resolve) => setTimeout(resolve, 700));
      const ticketIndex = MOCK_DATA.tickets.findIndex(
        (t) => t.id === parseInt(id)
      );
      if (ticketIndex === -1)
        throw new Error(`Ticket con ID ${id} no encontrado`);

      MOCK_DATA.tickets[ticketIndex] = {
        ...MOCK_DATA.tickets[ticketIndex],
        ...updateData,
        fechaActualizacion: new Date().toISOString(),
      };
      return MOCK_DATA.tickets[ticketIndex];
    }
    return makeRequest(`/tickets/${id}`, {
      method: "PUT",
      body: JSON.stringify(updateData),
    });
  },

  // Eliminar ticket
  delete: async (id) => {
    if (DEVELOPMENT_MODE) {
      await new Promise((resolve) => setTimeout(resolve, 600));
      const ticketIndex = MOCK_DATA.tickets.findIndex(
        (t) => t.id === parseInt(id)
      );
      if (ticketIndex === -1)
        throw new Error(`Ticket con ID ${id} no encontrado`);

      MOCK_DATA.tickets.splice(ticketIndex, 1);
      return null;
    }
    return makeRequest(`/tickets/${id}`, {
      method: "DELETE",
    });
  },
};

// GESTIÓN DE USUARIOS

export const usersAPI = {
  /**
   * Obtener lista de usuarios (solo admins)
   */
  getAll: async () => {
    if (DEVELOPMENT_MODE) {
      await new Promise((resolve) => setTimeout(resolve, 600));
      return [...MOCK_DATA.users];
    }
    return makeRequest("/admin/usuarios");
  },

  /**
   * Obtener usuario por ID
   */
  getById: async (id) => {
    if (DEVELOPMENT_MODE) {
      await new Promise((resolve) => setTimeout(resolve, 400));
      const user = MOCK_DATA.users.find((u) => u.id === parseInt(id));
      if (!user) throw new Error(`Usuario con ID ${id} no encontrado`);
      return user;
    }
    return makeRequest(`/admin/usuarios/${id}`);
  },

  /**
   * Crear nuevo usuario
   */
  create: async (userData) => {
    if (DEVELOPMENT_MODE) {
      await new Promise((resolve) => setTimeout(resolve, 900));
      const newUser = {
        id: Math.max(...MOCK_DATA.users.map((u) => u.id)) + 1,
        ...userData,
        fechaCreacion: new Date().toISOString(),
        activo: true,
      };
      MOCK_DATA.users.push(newUser);
      return newUser;
    }
    return makeRequest("/admin/usuarios", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },

  /**
   * Actualizar usuario
   */
  update: async (id, updateData) => {
    if (DEVELOPMENT_MODE) {
      await new Promise((resolve) => setTimeout(resolve, 700));
      const userIndex = MOCK_DATA.users.findIndex((u) => u.id === parseInt(id));
      if (userIndex === -1)
        throw new Error(`Usuario con ID ${id} no encontrado`);

      MOCK_DATA.users[userIndex] = {
        ...MOCK_DATA.users[userIndex],
        ...updateData,
      };
      return MOCK_DATA.users[userIndex];
    }
    return makeRequest(`/admin/usuarios/${id}`, {
      method: "PUT",
      body: JSON.stringify(updateData),
    });
  },

  /**
   * Eliminar usuario (desactivar)
   */
  delete: async (id) => {
    if (DEVELOPMENT_MODE) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const userIndex = MOCK_DATA.users.findIndex((u) => u.id === parseInt(id));
      if (userIndex === -1)
        throw new Error(`Usuario con ID ${id} no encontrado`);

      MOCK_DATA.users[userIndex].activo = false;
      return MOCK_DATA.users[userIndex];
    }
    return makeRequest(`/admin/usuarios/${id}`, {
      method: "DELETE",
    });
  },
};

// GESTIÓN DE TÉCNICOS

export const technicianAPI = {
  //Obtener lista de técnicos disponibles
  getAll: async () => {
    if (DEVELOPMENT_MODE) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return MOCK_DATA.users.filter((u) => u.rol === "TECNICO" && u.activo);
    }
    return makeRequest("/admin/tecnicos");
  },

  // Asignar ticket a técnico - no, tecnico toma ticket por si mismo
  assignTicket: async (technicianId, ticketId) => {
    if (DEVELOPMENT_MODE) {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const ticketIndex = MOCK_DATA.tickets.findIndex(
        (t) => t.id === parseInt(ticketId)
      );
      const technician = MOCK_DATA.users.find(
        (u) => u.id === parseInt(technicianId) && u.rol === "TECNICO"
      );

      if (ticketIndex === -1)
        throw new Error(`Ticket con ID ${ticketId} no encontrado`);
      if (!technician)
        throw new Error(`Técnico con ID ${technicianId} no encontrado`);

      MOCK_DATA.tickets[ticketIndex].tecnicoAsignado = {
        id: technician.id,
        nombre: technician.nombre,
        email: technician.email,
      };
      MOCK_DATA.tickets[ticketIndex].estado = "EN_PROGRESO";
      MOCK_DATA.tickets[ticketIndex].fechaActualizacion =
        new Date().toISOString();

      return MOCK_DATA.tickets[ticketIndex];
    }
    return makeRequest(`/admin/tecnicos/${technicianId}/asignar`, {
      method: "PUT",
      body: JSON.stringify({ ticketId }),
    });
  },
};

//  ESTADÍSTICAS Y REPORTES

export const statisticsAPI = {
  // Obtener estadísticas del dashboard
  getDashboard: async () => {
    if (DEVELOPMENT_MODE) {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      return MOCK_DATA.statistics;
    }
    return makeRequest("/estadisticas/dashboard");
  },

  // Obtener estadísticas por período
  getByPeriod: async (params) => {
    if (DEVELOPMENT_MODE) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Simular datos por período
      return {
        periodo: params.agrupacion || "MES",
        fechaInicio: params.fechaInicio,
        fechaFin: params.fechaFin,
        datos: [
          { fecha: "2024-08-01", tickets: 12 },
          { fecha: "2024-08-02", tickets: 8 },
          { fecha: "2024-08-03", tickets: 15 },
          { fecha: "2024-08-04", tickets: 7 },
          { fecha: "2024-08-05", tickets: 11 },
          { fecha: "2024-08-06", tickets: 9 },
        ],
      };
    }
    const queryString = new URLSearchParams(params).toString();
    return makeRequest(`/estadisticas/tickets-por-periodo?${queryString}`);
  },
};

// NOTIFICACIONES

export const notificationsAPI = {
  // Obtener notificaciones del usuario actual

  getAll: async () => {
    if (DEVELOPMENT_MODE) {
      await new Promise((resolve) => setTimeout(resolve, 600));
      return [
        {
          id: 1,
          mensaje: "Se te ha asignado el ticket #2",
          tipo: "ASIGNACION",
          leida: false,
          fechaCreacion: "2024-08-06T15:30:00",
          ticketId: 2,
        },
        {
          id: 2,
          mensaje: "El ticket #4 ha sido marcado como resuelto",
          tipo: "RESOLUCION",
          leida: true,
          fechaCreacion: "2024-08-05T17:30:00",
          ticketId: 4,
        },
        {
          id: 3,
          mensaje: "Nuevo ticket creado: Problema con conexión a red",
          tipo: "CREACION",
          leida: false,
          fechaCreacion: "2024-08-06T09:30:00",
          ticketId: 1,
        },
      ];
    }
    return makeRequest("/notificaciones");
  },

  // Marcar notificación como leída
  markAsRead: async (id) => {
    if (DEVELOPMENT_MODE) {
      await new Promise((resolve) => setTimeout(resolve, 400));
      return {
        id: parseInt(id),
        mensaje: "Notificación marcada como leída",
        leida: true,
      };
    }
    return makeRequest(`/notificaciones/${id}/marcar-leida`, {
      method: "PUT",
    });
  },
};

// HISTORIAL DE CAMBIOS

export const historyAPI = {
  // Obtener historial de cambios de un ticket
  getTicketHistory: async (ticketId) => {
    if (DEVELOPMENT_MODE) {
      await new Promise((resolve) => setTimeout(resolve, 700));
      return [
        {
          id: 1,
          accion: "CREADO",
          descripcion: `Ticket creado por María Trabajadora`,
          fecha: "2024-08-06T10:15:00",
          usuario: {
            id: 4,
            nombre: "María Trabajadora",
          },
        },
        {
          id: 2,
          accion: "ASIGNADO",
          descripcion: `Ticket asignado a Carlos Técnico`,
          fecha: "2024-08-06T11:20:00",
          usuario: {
            id: 2,
            nombre: "Administrador",
          },
        },
        {
          id: 3,
          accion: "COMENTARIO",
          descripcion: "Se agregó comentario: 'Revisando el problema'",
          fecha: "2024-08-06T14:30:00",
          usuario: {
            id: 3,
            nombre: "Carlos Técnico",
          },
        },
      ];
    }
    return makeRequest(`/historial/ticket/${ticketId}`);
  },
};

// HEALTH CHECK

export const healthAPI = {
  /**
   * Verificar estado de la API
   */
  check: async () => {
    return fetch("http://localhost:8080/actuator/health")
      .then((response) => response.json())
      .catch(() => ({ status: "DOWN" }));
  },
};

// UTILIDADES

export const apiUtils = {
  // Verificar si el usuario está autenticado
  isAuthenticated: () => {
    return !!getAuthToken();
  },

  // Obtener información del usuario actual
  getCurrentUser: () => {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },

  // Guardar datos de usuario tras login exitoso

  setUserData: (token, user) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(user));
  },

  // Formatear fecha para mostrar
  formatDate: (dateStr) => {
    return new Date(dateStr).toLocaleString("es-ES", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  },

  // Mapear estados de la API al formato del frontend
  mapTicketState: (apiState) => {
    const stateMap = {
      ABIERTO: "NO_ASIGNADO",
      EN_PROGRESO: "ASIGNADO",
      RESUELTO: "RESUELTO",
      CERRADO: "FINALIZADO",
      REABIERTO: "REABIERTO",
    };
    return stateMap[apiState] || apiState;
  },

  // Mapear estados del frontend al formato de la API
  mapStateToAPI: (frontendState) => {
    const stateMap = {
      NO_ASIGNADO: "ABIERTO",
      ASIGNADO: "EN_PROGRESO",
      RESUELTO: "RESUELTO",
      FINALIZADO: "CERRADO",
      REABIERTO: "REABIERTO",
    };
    return stateMap[frontendState] || frontendState;
  },
};

// Exportación por defecto para uso general
export default {
  auth: authAPI,
  tickets: ticketsAPI,
  users: usersAPI,
  technicians: technicianAPI,
  statistics: statisticsAPI,
  notifications: notificationsAPI,
  history: historyAPI,
  health: healthAPI,
  utils: apiUtils,
};
