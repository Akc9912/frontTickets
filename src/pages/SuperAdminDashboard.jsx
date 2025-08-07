import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";
import { statisticsAPI, ticketsAPI, usersAPI } from "../services/api";

// Material Icons
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import RefreshIcon from "@mui/icons-material/Refresh";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import BuildIcon from "@mui/icons-material/Build";
import WorkIcon from "@mui/icons-material/Work";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const SuperAdminDashboard = () => {
  const { user } = useAuth();
  const [hoveredState, setHoveredState] = useState(null);
  const [hoveredUserRole, setHoveredUserRole] = useState(null);
  const [hoveredUserStatus, setHoveredUserStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados para datos de la API
  const [ticketStats, setTicketStats] = useState({
    total: 0,
    noAsignado: 0,
    asignado: 0,
    reabierto: 0,
    resuelto: 0,
    finalizado: 0,
  });

  const [userStats, setUserStats] = useState({
    totalUsuarios: 0,
    admins: 0,
    tecnicos: 0,
    trabajadores: 0,
    activos: 0,
    inactivos: 0,
  });

  // Cargar datos desde la API
  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Cargar estadísticas y datos en paralelo
      const [dashboardStats, allTickets, allUsers] = await Promise.all([
        statisticsAPI.getDashboard().catch(() => null),
        ticketsAPI.getAll().catch(() => []),
        usersAPI.getAll().catch(() => []),
      ]);

      // Procesar estadísticas de tickets
      if (dashboardStats) {
        // Usar datos de la API si están disponibles
        setTicketStats({
          total: dashboardStats.totalTickets || 0,
          noAsignado: dashboardStats.ticketsPorEstado?.ABIERTO || 0,
          asignado: dashboardStats.ticketsPorEstado?.EN_PROGRESO || 0,
          reabierto: dashboardStats.ticketsPorEstado?.REABIERTO || 0,
          resuelto: dashboardStats.ticketsPorEstado?.RESUELTO || 0,
          finalizado: dashboardStats.ticketsPorEstado?.CERRADO || 0,
        });
      } else {
        // Procesar tickets localmente si no hay API de estadísticas
        const ticketCounts = allTickets.reduce((acc, ticket) => {
          const estado = ticket.estado || "ABIERTO";
          acc[estado] = (acc[estado] || 0) + 1;
          return acc;
        }, {});

        setTicketStats({
          total: allTickets.length,
          noAsignado: ticketCounts.ABIERTO || 0,
          asignado: ticketCounts.EN_PROGRESO || 0,
          reabierto: ticketCounts.REABIERTO || 0,
          resuelto: ticketCounts.RESUELTO || 0,
          finalizado: ticketCounts.CERRADO || 0,
        });
      }

      // Procesar estadísticas de usuarios
      const userCounts = allUsers.reduce(
        (acc, user) => {
          acc.total++;
          if (user.activo !== false) acc.activos++;
          else acc.inactivos++;

          switch (user.rol) {
            case "SUPERADMIN":
            case "ADMIN":
              acc.admins++;
              break;
            case "TECNICO":
              acc.tecnicos++;
              break;
            case "TRABAJADOR":
              acc.trabajadores++;
              break;
          }
          return acc;
        },
        {
          total: 0,
          activos: 0,
          inactivos: 0,
          admins: 0,
          tecnicos: 0,
          trabajadores: 0,
        }
      );

      setUserStats({
        totalUsuarios: userCounts.total,
        admins: userCounts.admins,
        tecnicos: userCounts.tecnicos,
        trabajadores: userCounts.trabajadores,
        activos: userCounts.activos,
        inactivos: userCounts.inactivos,
      });
    } catch (err) {
      console.error("Error cargando datos del dashboard:", err);
      setError("Error al cargar las estadísticas. Usando datos de ejemplo.");

      // Usar datos de fallback
      setTicketStats({
        total: 156,
        noAsignado: 23,
        asignado: 45,
        reabierto: 12,
        resuelto: 68,
        finalizado: 8,
      });

      setUserStats({
        totalUsuarios: 89,
        admins: 5,
        tecnicos: 12,
        trabajadores: 72,
        activos: 84,
        inactivos: 5,
      });
    } finally {
      setLoading(false);
    }
  };

  // Configuración de estados para el gráfico de usuarios
  const userRolesConfig = [
    {
      key: "admins",
      label: "Administradores",
      icon: AdminPanelSettingsIcon,
      color: "#f44336", // Rojo
      value: userStats.admins,
    },
    {
      key: "tecnicos",
      label: "Técnicos",
      icon: BuildIcon,
      color: "#2196f3", // Azul
      value: userStats.tecnicos,
    },
    {
      key: "trabajadores",
      label: "Trabajadores",
      icon: WorkIcon,
      color: "#ff9800", // Amarillo/Naranja
      value: userStats.trabajadores,
    },
  ];

  // Configuración de estados para el gráfico de estado de usuarios
  const userStatusConfig = [
    {
      key: "activos",
      label: "Usuarios Activos",
      icon: CheckCircleOutlineIcon,
      color: "#4caf50",
      value: userStats.activos,
    },
    {
      key: "inactivos",
      label: "Usuarios Inactivos",
      icon: ErrorOutlineIcon,
      color: "#f44336",
      value: userStats.inactivos,
    },
  ];

  // Configuración de estados para el gráfico
  const ticketStatesConfig = [
    {
      key: "noAsignado",
      label: "No Asignado",
      icon: AssignmentIcon,
      color: "#ff9800",
      value: ticketStats.noAsignado,
    },
    {
      key: "asignado",
      label: "Asignado",
      icon: AssignmentIndIcon,
      color: "#2196f3",
      value: ticketStats.asignado,
    },
    {
      key: "reabierto",
      label: "Reabierto",
      icon: RefreshIcon,
      color: "#9c27b0",
      value: ticketStats.reabierto,
    },
    {
      key: "resuelto",
      label: "Resuelto",
      icon: CheckCircleIcon,
      color: "#4caf50",
      value: ticketStats.resuelto,
    },
    {
      key: "finalizado",
      label: "Finalizado",
      icon: TaskAltIcon,
      color: "#607d8b",
      value: ticketStats.finalizado,
    },
  ];

  // Calcular porcentajes y posiciones del gráfico
  let cumulativePercentage = 0;
  const chartData = ticketStatesConfig.map((state) => {
    const percentage = (state.value / ticketStats.total) * 100;
    const startOffset = cumulativePercentage;
    cumulativePercentage += percentage;

    return {
      ...state,
      percentage: Math.round(percentage),
      strokeDasharray: `${(percentage / 100) * 219.8} 219.8`,
      strokeDashoffset: `-${(startOffset / 100) * 219.8}`,
    };
  });

  // Calcular porcentajes para el gráfico de usuarios por roles
  let cumulativeUserPercentage = 0;
  const userChartData = userRolesConfig.map((role) => {
    const percentage = (role.value / userStats.totalUsuarios) * 100;
    const startOffset = cumulativeUserPercentage;
    cumulativeUserPercentage += percentage;

    return {
      ...role,
      percentage: Math.round(percentage),
      strokeDasharray: `${(percentage / 100) * 219.8} 219.8`,
      strokeDashoffset: `-${(startOffset / 100) * 219.8}`,
    };
  });

  // Calcular porcentajes para el gráfico de estado de usuarios
  let cumulativeStatusPercentage = 0;
  const userStatusChartData = userStatusConfig.map((status) => {
    const percentage = (status.value / userStats.totalUsuarios) * 100;
    const startOffset = cumulativeStatusPercentage;
    cumulativeStatusPercentage += percentage;

    return {
      ...status,
      percentage: Math.round(percentage),
      strokeDasharray: `${(percentage / 100) * 219.8} 219.8`,
      strokeDashoffset: `-${(startOffset / 100) * 219.8}`,
    };
  });

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
              <h2>Panel de SuperAdmin</h2>
              <p>
                Bienvenido, {user?.nombre} {user?.apellido}
              </p>
            </div>
            <button
              onClick={loadDashboardData}
              disabled={loading}
              style={{
                padding: "10px 20px",
                backgroundColor: "#2196f3",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.6 : 1,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <RefreshIcon style={{ fontSize: "18px" }} />
              {loading ? "Actualizando..." : "Actualizar"}
            </button>
          </div>
        </div>

        <div className="dashboard-content">
          {/* Mensaje de error */}
          {error && (
            <div
              style={{
                backgroundColor: "#fff3cd",
                color: "#856404",
                padding: "12px",
                borderRadius: "4px",
                marginBottom: "20px",
                border: "1px solid #ffeeba",
              }}
            >
              {error}
            </div>
          )}

          {/* Indicador de carga */}
          {loading && (
            <div style={{ textAlign: "center", padding: "40px" }}>
              <RefreshIcon
                style={{
                  fontSize: "40px",
                  color: "#2196f3",
                  animation: "spin 1s linear infinite",
                }}
              />
              <p>Cargando estadísticas...</p>
            </div>
          )}

          {!loading && (
            <div className="dashboard-cards">
              {/* Tarjeta de Estadísticas de Tickets */}
              <div className="dashboard-card">
                <div className="card-header">
                  <div className="card-title">
                    <ConfirmationNumberIcon className="card-icon" />
                    <h3>Estadísticas de Tickets</h3>
                  </div>
                  <div className="card-subtitle">
                    Total: <strong>{ticketStats.total}</strong> tickets en el
                    sistema
                  </div>
                </div>

                <div className="card-content">
                  <div className="unified-chart-section">
                    <div className="chart-with-legend">
                      <div className="interactive-legend">
                        {chartData.map((state) => (
                          <div
                            key={state.key}
                            className={`legend-stat-item ${
                              hoveredState === state.key ? "active" : ""
                            }`}
                            onMouseEnter={() => setHoveredState(state.key)}
                            onMouseLeave={() => setHoveredState(null)}
                          >
                            <state.icon
                              className="stat-icon-direct"
                              style={{ color: state.color }}
                            />
                            <div className="stat-details">
                              <div className="stat-value">{state.value}</div>
                              <div className="stat-label">{state.label}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="donut-chart">
                        <svg viewBox="0 0 100 100" className="donut-svg">
                          {/* Círculo base */}
                          <circle
                            cx="50"
                            cy="50"
                            r="35"
                            fill="none"
                            stroke="#e3f2fd"
                            strokeWidth="6"
                          ></circle>

                          {/* Segmentos del gráfico */}
                          {chartData.map((state, index) => (
                            <circle
                              key={state.key}
                              cx="50"
                              cy="50"
                              r="35"
                              fill="none"
                              stroke={state.color}
                              strokeWidth="6"
                              strokeDasharray={state.strokeDasharray}
                              strokeDashoffset={state.strokeDashoffset}
                              transform="rotate(-90 50 50)"
                              className={`chart-segment ${
                                hoveredState === state.key ? "highlighted" : ""
                              }`}
                              style={{
                                opacity:
                                  hoveredState && hoveredState !== state.key
                                    ? 0.3
                                    : 1,
                                strokeWidth: hoveredState === state.key ? 8 : 6,
                              }}
                            />
                          ))}

                          {/* Texto central */}
                          <text
                            x="50"
                            y="50"
                            textAnchor="middle"
                            dy="0.3em"
                            className="chart-center-text"
                          >
                            {hoveredState
                              ? chartData.find((s) => s.key === hoveredState)
                                  ?.percentage + "%"
                              : ticketStats.total}
                          </text>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tarjeta de Estadísticas de Usuarios */}
              <div className="dashboard-card">
                <div className="card-header">
                  <div className="card-title">
                    <PeopleIcon className="card-icon" />
                    <h3>Estadísticas de Usuarios</h3>
                  </div>
                  <div className="card-subtitle">
                    Total: <strong>{userStats.totalUsuarios}</strong> usuarios
                    registrados
                  </div>
                </div>

                <div className="card-content">
                  <div className="unified-chart-section">
                    {/* Gráfico de Roles */}
                    <div className="user-chart-container">
                      <h4 className="chart-section-title">
                        Distribución por Roles
                      </h4>
                      <div className="chart-with-legend">
                        <div className="interactive-legend">
                          {userChartData.map((role) => (
                            <div
                              key={role.key}
                              className={`legend-stat-item ${
                                hoveredUserRole === role.key ? "active" : ""
                              }`}
                              onMouseEnter={() => setHoveredUserRole(role.key)}
                              onMouseLeave={() => setHoveredUserRole(null)}
                            >
                              <role.icon
                                className="stat-icon-direct"
                                style={{ color: role.color }}
                              />
                              <div className="stat-details">
                                <div className="stat-value">{role.value}</div>
                                <div className="stat-label">{role.label}</div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="donut-chart-medium">
                          <svg viewBox="0 0 100 100" className="donut-svg">
                            {/* Círculo base */}
                            <circle
                              cx="50"
                              cy="50"
                              r="35"
                              fill="none"
                              stroke="#e3f2fd"
                              strokeWidth="6"
                            ></circle>

                            {/* Segmentos del gráfico */}
                            {userChartData.map((role, index) => (
                              <circle
                                key={role.key}
                                cx="50"
                                cy="50"
                                r="35"
                                fill="none"
                                stroke={role.color}
                                strokeWidth="6"
                                strokeDasharray={role.strokeDasharray}
                                strokeDashoffset={role.strokeDashoffset}
                                transform="rotate(-90 50 50)"
                                className={`chart-segment ${
                                  hoveredUserRole === role.key
                                    ? "highlighted"
                                    : ""
                                }`}
                                style={{
                                  opacity:
                                    hoveredUserRole &&
                                    hoveredUserRole !== role.key
                                      ? 0.3
                                      : 1,
                                  strokeWidth:
                                    hoveredUserRole === role.key ? 8 : 6,
                                }}
                              />
                            ))}

                            {/* Texto central */}
                            <text
                              x="50"
                              y="50"
                              textAnchor="middle"
                              dy="0.3em"
                              className="chart-center-text"
                            >
                              {hoveredUserRole
                                ? userChartData.find(
                                    (r) => r.key === hoveredUserRole
                                  )?.percentage + "%"
                                : userStats.totalUsuarios}
                            </text>
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Gráfico de Estado */}
                    <div className="user-chart-container">
                      <h4 className="chart-section-title">
                        Estado de Usuarios
                      </h4>
                      <div className="chart-with-legend">
                        <div className="interactive-legend">
                          {userStatusChartData.map((status) => (
                            <div
                              key={status.key}
                              className={`legend-stat-item ${
                                hoveredUserStatus === status.key ? "active" : ""
                              }`}
                              onMouseEnter={() =>
                                setHoveredUserStatus(status.key)
                              }
                              onMouseLeave={() => setHoveredUserStatus(null)}
                            >
                              <status.icon
                                className="stat-icon-direct"
                                style={{ color: status.color }}
                              />
                              <div className="stat-details">
                                <div className="stat-value">{status.value}</div>
                                <div className="stat-label">{status.label}</div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="donut-chart-medium">
                          <svg viewBox="0 0 100 100" className="donut-svg">
                            {/* Círculo base */}
                            <circle
                              cx="50"
                              cy="50"
                              r="35"
                              fill="none"
                              stroke="#e3f2fd"
                              strokeWidth="6"
                            ></circle>

                            {/* Segmentos del gráfico */}
                            {userStatusChartData.map((status, index) => (
                              <circle
                                key={status.key}
                                cx="50"
                                cy="50"
                                r="35"
                                fill="none"
                                stroke={status.color}
                                strokeWidth="6"
                                strokeDasharray={status.strokeDasharray}
                                strokeDashoffset={status.strokeDashoffset}
                                transform="rotate(-90 50 50)"
                                className={`chart-segment ${
                                  hoveredUserStatus === status.key
                                    ? "highlighted"
                                    : ""
                                }`}
                                style={{
                                  opacity:
                                    hoveredUserStatus &&
                                    hoveredUserStatus !== status.key
                                      ? 0.3
                                      : 1,
                                  strokeWidth:
                                    hoveredUserStatus === status.key ? 8 : 6,
                                }}
                              />
                            ))}

                            {/* Texto central */}
                            <text
                              x="50"
                              y="50"
                              textAnchor="middle"
                              dy="0.3em"
                              className="chart-center-text"
                            >
                              {hoveredUserStatus
                                ? userStatusChartData.find(
                                    (s) => s.key === hoveredUserStatus
                                  )?.percentage + "%"
                                : userStats.totalUsuarios}
                            </text>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SuperAdminDashboard;
