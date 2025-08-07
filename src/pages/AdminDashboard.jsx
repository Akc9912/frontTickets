import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";

// Material Icons
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import RefreshIcon from "@mui/icons-material/Refresh";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import BuildIcon from "@mui/icons-material/Build";
import WorkIcon from "@mui/icons-material/Work";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [hoveredState, setHoveredState] = useState(null);
  const [hoveredUserRole, setHoveredUserRole] = useState(null);
  const [hoveredUserStatus, setHoveredUserStatus] = useState(null);

  // Datos simulados para el área del administrador
  const ticketStats = {
    total: 67,
    noAsignado: 12,
    asignado: 18,
    reabierto: 5,
    resuelto: 25,
    finalizado: 7,
  };

  const userStats = {
    totalUsuarios: 45,
    tecnicos: 8,
    trabajadores: 37,
    activos: 43,
    inactivos: 2,
  };

  // Configuración de roles para el gráfico de usuarios (sin administradores)
  const userRolesConfig = [
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

  // Configuración de estados para el gráfico de tickets
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
      color: "#ff5722",
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
      color: "#9c27b0",
      value: ticketStats.finalizado,
    },
  ];

  // Función para calcular el ángulo de cada segmento del gráfico circular
  const calculateAngles = (data) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = 0;

    return data.map((item) => {
      const angle = (item.value / total) * 360;
      const result = {
        ...item,
        startAngle: currentAngle,
        endAngle: currentAngle + angle,
        percentage: ((item.value / total) * 100).toFixed(1),
      };
      currentAngle += angle;
      return result;
    });
  };

  // Función para crear el path SVG de cada segmento
  const createArcPath = (centerX, centerY, radius, startAngle, endAngle) => {
    const start = polarToCartesian(centerX, centerY, radius, endAngle);
    const end = polarToCartesian(centerX, centerY, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
      "M",
      centerX,
      centerY,
      "L",
      start.x,
      start.y,
      "A",
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
      "Z",
    ].join(" ");
  };

  // Función auxiliar para convertir coordenadas polares a cartesianas
  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  // Renderizar gráfico circular
  const renderDonutChart = (data, size = 200, hoverState, setHoverState) => {
    const center = size / 2;
    const radius = size / 2 - 20;
    const innerRadius = radius - 30;
    const segments = calculateAngles(data);

    return (
      <div className="chart-container">
        <svg width={size} height={size} className="donut-chart">
          {segments.map((segment) => {
            const isHovered = hoverState === segment.key;
            const actualRadius = isHovered ? radius + 5 : radius;

            return (
              <g key={segment.key}>
                <path
                  d={createArcPath(
                    center,
                    center,
                    actualRadius,
                    segment.startAngle,
                    segment.endAngle
                  )}
                  fill={segment.color}
                  className={`chart-segment ${isHovered ? "hovered" : ""}`}
                  onMouseEnter={() => setHoverState(segment.key)}
                  onMouseLeave={() => setHoverState(null)}
                />
                <path
                  d={createArcPath(
                    center,
                    center,
                    innerRadius,
                    segment.startAngle,
                    segment.endAngle
                  )}
                  fill="white"
                />
              </g>
            );
          })}

          {/* Círculo central */}
          <circle
            cx={center}
            cy={center}
            r={innerRadius}
            fill="white"
            stroke="#f0f0f0"
            strokeWidth="2"
          />

          {/* Texto central */}
          <text
            x={center}
            y={center - 5}
            textAnchor="middle"
            className="chart-total"
            fontSize="24"
            fontWeight="bold"
            fill="#333"
          >
            {data.reduce((sum, item) => sum + item.value, 0)}
          </text>
          <text
            x={center}
            y={center + 15}
            textAnchor="middle"
            className="chart-label"
            fontSize="12"
            fill="#666"
          >
            Total
          </text>
        </svg>

        {/* Leyenda */}
        <div className="chart-legend">
          {segments.map((segment) => {
            const IconComponent = segment.icon;
            const isHovered = hoverState === segment.key;

            return (
              <div
                key={segment.key}
                className={`legend-item ${isHovered ? "hovered" : ""}`}
                onMouseEnter={() => setHoverState(segment.key)}
                onMouseLeave={() => setHoverState(null)}
              >
                <IconComponent style={{ color: segment.color, fontSize: 16 }} />
                <span className="legend-label">{segment.label}</span>
                <span className="legend-value">{segment.value}</span>
                <span className="legend-percentage">
                  ({segment.percentage}%)
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="dashboard">
        <div className="dashboard-header">
          <h2>Panel de Administrador</h2>
          <p>
            Bienvenido, {user?.nombre} {user?.apellido}
          </p>
        </div>

        <div className="dashboard-content">
          {/* Sección de Estadísticas Generales */}
          <div className="dashboard-section">
            <h3 className="section-title">📊 Resumen General - Mi Área</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">
                  <ConfirmationNumberIcon />
                </div>
                <div className="stat-content">
                  <h3>Total Tickets</h3>
                  <p className="stat-number">{ticketStats.total}</p>
                  <p>Tickets de mi área</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">
                  <PeopleIcon />
                </div>
                <div className="stat-content">
                  <h3>Total Usuarios</h3>
                  <p className="stat-number">{userStats.totalUsuarios}</p>
                  <p>Usuarios bajo mi gestión</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">
                  <BuildIcon />
                </div>
                <div className="stat-content">
                  <h3>Técnicos</h3>
                  <p className="stat-number">{userStats.tecnicos}</p>
                  <p>Personal técnico</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">
                  <CheckCircleOutlineIcon />
                </div>
                <div className="stat-content">
                  <h3>Usuarios Activos</h3>
                  <p className="stat-number">{userStats.activos}</p>
                  <p>Cuentas habilitadas</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sección de Gráficos Interactivos */}
          <div className="dashboard-section">
            <h3 className="section-title">📈 Análisis Detallado</h3>
            <div className="charts-grid">
              {/* Gráfico de Estados de Tickets */}
              <div className="chart-card">
                <h4>Estados de Tickets</h4>
                {renderDonutChart(
                  ticketStatesConfig,
                  220,
                  hoveredState,
                  setHoveredState
                )}
              </div>

              {/* Gráfico de Roles de Usuarios */}
              <div className="chart-card">
                <h4>Distribución por Roles</h4>
                {renderDonutChart(
                  userRolesConfig,
                  220,
                  hoveredUserRole,
                  setHoveredUserRole
                )}
              </div>

              {/* Gráfico de Estado de Usuarios */}
              <div className="chart-card">
                <h4>Estado de Usuarios</h4>
                {renderDonutChart(
                  userStatusConfig,
                  220,
                  hoveredUserStatus,
                  setHoveredUserStatus
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
