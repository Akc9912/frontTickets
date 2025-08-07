import React from "react";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";

const TrabajadorDashboard = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="dashboard">
        <div className="dashboard-header">
          <h2>Panel de Trabajador</h2>
          <p>
            Bienvenido, {user?.nombre} {user?.apellido}
          </p>
        </div>

        <div className="dashboard-content">
          {/* Sección de Estadísticas de Mis Tickets */}
          <div className="dashboard-section">
            <h3 className="section-title">🎫 Mis Tickets</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Tickets</h3>
                <p className="stat-number">12</p>
                <p>Tickets que he creado</p>
              </div>

              <div className="stat-card">
                <h3>Pendientes</h3>
                <p className="stat-number">3</p>
                <p>Esperando asignación</p>
              </div>

              <div className="stat-card">
                <h3>En Proceso</h3>
                <p className="stat-number">4</p>
                <p>Siendo atendidos</p>
              </div>

              <div className="stat-card">
                <h3>Resueltos</h3>
                <p className="stat-number">5</p>
                <p>Tickets solucionados</p>
              </div>

              <div className="stat-card">
                <h3>Cerrados</h3>
                <p className="stat-number">0</p>
                <p>Tickets finalizados</p>
              </div>
            </div>

            <div className="dashboard-section">
              <h3 className="section-title">📊 Estado General del Sistema</h3>
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>Total Sistema</h3>
                  <p className="stat-number">156</p>
                  <p>Tickets en el sistema</p>
                </div>

                <div className="stat-card">
                  <h3>Tiempo Promedio</h3>
                  <p className="stat-number">3.2h</p>
                  <p>Resolución de tickets</p>
                </div>

                <div className="stat-card">
                  <h3>Técnicos Activos</h3>
                  <p className="stat-number">12</p>
                  <p>Personal disponible</p>
                </div>

                <div className="stat-card">
                  <h3>Satisfacción</h3>
                  <p className="stat-number">4.6</p>
                  <p>Calificación promedio</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default TrabajadorDashboard;
