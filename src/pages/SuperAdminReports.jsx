import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";

// Material Icons
import BarChartIcon from "@mui/icons-material/BarChart";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SpeedIcon from "@mui/icons-material/Speed";
import PeopleIcon from "@mui/icons-material/People";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BuildIcon from "@mui/icons-material/Build";
import DateRangeIcon from "@mui/icons-material/DateRange";
import GetAppIcon from "@mui/icons-material/GetApp";

const SuperAdminReports = () => {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState("7d");
  const [reportType, setReportType] = useState("tickets");

  // Datos simulados para reportes
  const reportData = {
    tickets: {
      totalCreated: 127,
      totalResolved: 98,
      avgResolutionTime: 2.3, // días
      resolutionRate: 77.2, // porcentaje
      trendCreated: +12.5, // porcentaje de cambio
      trendResolved: +8.7,
      trendAvgTime: -15.2,
      trendRate: +5.8,
    },
    users: {
      totalActive: 84,
      totalInactive: 5,
      newRegistrations: 7,
      loginRate: 94.3, // porcentaje
      trendActive: +3.7,
      trendInactive: -12.5,
      trendNew: +40.0,
      trendLogin: +2.1,
    },
    performance: {
      avgResponseTime: 1.2, // horas
      customerSatisfaction: 4.6, // de 5
      reopenRate: 8.3, // porcentaje
      firstContactResolution: 68.7, // porcentaje
      trendResponse: -22.1,
      trendSatisfaction: +12.3,
      trendReopen: -5.4,
      trendFirstContact: +9.8,
    },
  };

  const ticketsByCategory = [
    { category: "Hardware", count: 45, percentage: 35.4 },
    { category: "Software", count: 38, percentage: 29.9 },
    { category: "Infraestructura", count: 25, percentage: 19.7 },
    { category: "Comunicaciones", count: 19, percentage: 15.0 },
  ];

  const technicianPerformance = [
    {
      name: "María González",
      ticketsResolved: 34,
      avgTime: 1.8,
      satisfaction: 4.8,
      efficiency: 92.3,
    },
    {
      name: "Ana Martínez",
      ticketsResolved: 29,
      avgTime: 2.1,
      satisfaction: 4.5,
      efficiency: 87.6,
    },
    {
      name: "Carlos López",
      ticketsResolved: 22,
      avgTime: 2.7,
      satisfaction: 4.2,
      efficiency: 81.4,
    },
  ];

  const monthlyTrend = [
    { month: "Ene", created: 145, resolved: 132 },
    { month: "Feb", created: 138, resolved: 129 },
    { month: "Mar", created: 162, created: 148 },
    { month: "Abr", created: 134, resolved: 128 },
    { month: "May", created: 156, resolved: 142 },
    { month: "Jun", created: 149, resolved: 138 },
    { month: "Jul", created: 127, resolved: 98 },
  ];

  const getTrendIcon = (trend) => {
    if (trend > 0) {
      return <TrendingUpIcon style={{ color: "#4caf50" }} />;
    } else if (trend < 0) {
      return <TrendingDownIcon style={{ color: "#f44336" }} />;
    }
    return <AccessTimeIcon style={{ color: "#ff9800" }} />;
  };

  const getTrendColor = (trend) => {
    if (trend > 0) return "#4caf50";
    if (trend < 0) return "#f44336";
    return "#ff9800";
  };

  const formatTrend = (trend) => {
    const abs = Math.abs(trend);
    const sign = trend > 0 ? "+" : "";
    return `${sign}${abs.toFixed(1)}%`;
  };

  return (
    <Layout>
      <div className="dashboard">
        <div className="dashboard-header">
          <h2>Reportes Globales</h2>
          <p>Análisis detallado del rendimiento del sistema</p>
        </div>

        <div className="dashboard-content">
          {/* Controles de periodo */}
          <div className="report-controls">
            <div className="period-selector">
              <DateRangeIcon className="control-icon" />
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="period-select"
              >
                <option value="7d">Últimos 7 días</option>
                <option value="30d">Últimos 30 días</option>
                <option value="90d">Últimos 3 meses</option>
                <option value="1y">Último año</option>
              </select>
            </div>
            <button className="btn-secondary">
              <GetAppIcon className="btn-icon" />
              Exportar Reporte
            </button>
          </div>

          {/* Métricas principales */}
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-header">
                <div className="metric-icon tickets">
                  <ConfirmationNumberIcon />
                </div>
                <div className="metric-trend">
                  {getTrendIcon(reportData.tickets.trendCreated)}
                  <span
                    style={{
                      color: getTrendColor(reportData.tickets.trendCreated),
                    }}
                  >
                    {formatTrend(reportData.tickets.trendCreated)}
                  </span>
                </div>
              </div>
              <div className="metric-content">
                <h3>{reportData.tickets.totalCreated}</h3>
                <p>Tickets Creados</p>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <div className="metric-icon resolved">
                  <CheckCircleIcon />
                </div>
                <div className="metric-trend">
                  {getTrendIcon(reportData.tickets.trendResolved)}
                  <span
                    style={{
                      color: getTrendColor(reportData.tickets.trendResolved),
                    }}
                  >
                    {formatTrend(reportData.tickets.trendResolved)}
                  </span>
                </div>
              </div>
              <div className="metric-content">
                <h3>{reportData.tickets.totalResolved}</h3>
                <p>Tickets Resueltos</p>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <div className="metric-icon time">
                  <AccessTimeIcon />
                </div>
                <div className="metric-trend">
                  {getTrendIcon(reportData.tickets.trendAvgTime)}
                  <span
                    style={{
                      color: getTrendColor(reportData.tickets.trendAvgTime),
                    }}
                  >
                    {formatTrend(reportData.tickets.trendAvgTime)}
                  </span>
                </div>
              </div>
              <div className="metric-content">
                <h3>{reportData.tickets.avgResolutionTime} días</h3>
                <p>Tiempo Promedio</p>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <div className="metric-icon rate">
                  <SpeedIcon />
                </div>
                <div className="metric-trend">
                  {getTrendIcon(reportData.tickets.trendRate)}
                  <span
                    style={{
                      color: getTrendColor(reportData.tickets.trendRate),
                    }}
                  >
                    {formatTrend(reportData.tickets.trendRate)}
                  </span>
                </div>
              </div>
              <div className="metric-content">
                <h3>{reportData.tickets.resolutionRate}%</h3>
                <p>Tasa de Resolución</p>
              </div>
            </div>
          </div>

          {/* Gráficos y tablas */}
          <div className="reports-grid">
            {/* Distribución por categorías */}
            <div className="report-card">
              <div className="report-header">
                <h3>Tickets por Categoría</h3>
                <BarChartIcon className="report-icon" />
              </div>
              <div className="report-content">
                <div className="category-chart">
                  {ticketsByCategory.map((item, index) => (
                    <div key={index} className="category-item">
                      <div className="category-info">
                        <span className="category-name">{item.category}</span>
                        <span className="category-count">{item.count}</span>
                      </div>
                      <div className="category-bar">
                        <div
                          className="category-progress"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <span className="category-percentage">
                        {item.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Rendimiento de técnicos */}
            <div className="report-card">
              <div className="report-header">
                <h3>Rendimiento de Técnicos</h3>
                <PeopleIcon className="report-icon" />
              </div>
              <div className="report-content">
                <div className="technician-list">
                  {technicianPerformance.map((tech, index) => (
                    <div key={index} className="technician-item">
                      <div className="tech-info">
                        <div className="tech-name">{tech.name}</div>
                        <div className="tech-stats">
                          <span className="tech-stat">
                            {tech.ticketsResolved} tickets
                          </span>
                          <span className="tech-stat">
                            {tech.avgTime} días promedio
                          </span>
                        </div>
                      </div>
                      <div className="tech-metrics">
                        <div className="tech-satisfaction">
                          ★ {tech.satisfaction}
                        </div>
                        <div className="tech-efficiency">
                          {tech.efficiency}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Métricas de rendimiento */}
            <div className="report-card full-width">
              <div className="report-header">
                <h3>Métricas de Rendimiento</h3>
                <SpeedIcon className="report-icon" />
              </div>
              <div className="report-content">
                <div className="performance-metrics">
                  <div className="performance-item">
                    <div className="performance-label">
                      Tiempo de Respuesta Promedio
                    </div>
                    <div className="performance-value">
                      {reportData.performance.avgResponseTime} horas
                      <span
                        className="performance-trend"
                        style={{
                          color: getTrendColor(
                            reportData.performance.trendResponse
                          ),
                        }}
                      >
                        {formatTrend(reportData.performance.trendResponse)}
                      </span>
                    </div>
                  </div>

                  <div className="performance-item">
                    <div className="performance-label">
                      Satisfacción del Cliente
                    </div>
                    <div className="performance-value">
                      {reportData.performance.customerSatisfaction}/5
                      <span
                        className="performance-trend"
                        style={{
                          color: getTrendColor(
                            reportData.performance.trendSatisfaction
                          ),
                        }}
                      >
                        {formatTrend(reportData.performance.trendSatisfaction)}
                      </span>
                    </div>
                  </div>

                  <div className="performance-item">
                    <div className="performance-label">Tasa de Reapertura</div>
                    <div className="performance-value">
                      {reportData.performance.reopenRate}%
                      <span
                        className="performance-trend"
                        style={{
                          color: getTrendColor(
                            reportData.performance.trendReopen
                          ),
                        }}
                      >
                        {formatTrend(reportData.performance.trendReopen)}
                      </span>
                    </div>
                  </div>

                  <div className="performance-item">
                    <div className="performance-label">
                      Resolución en Primer Contacto
                    </div>
                    <div className="performance-value">
                      {reportData.performance.firstContactResolution}%
                      <span
                        className="performance-trend"
                        style={{
                          color: getTrendColor(
                            reportData.performance.trendFirstContact
                          ),
                        }}
                      >
                        {formatTrend(reportData.performance.trendFirstContact)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SuperAdminReports;
