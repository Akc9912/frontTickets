import React from "react";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";

const TecnicoDashboard = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="dashboard">
        <div className="dashboard-header">
          <h2>Panel de Técnico</h2>
          <p>
            Bienvenido, {user?.nombre} {user?.apellido}
          </p>
        </div>

        <div className="dashboard-content">
          {/* Sección de Estadísticas de Tickets */}
          <div className="dashboard-section">
            <h3 className="section-title">🔧 Mis Tickets Asignados</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Asignados</h3>
                <p className="stat-number">15</p>
                <p>Tickets bajo mi responsabilidad</p>
              </div>

              <div className="stat-card">
                <h3>Pendientes</h3>
                <p className="stat-number">5</p>
                <p>Por iniciar</p>
              </div>

              <div className="stat-card">
                <h3>En Proceso</h3>
                <p className="stat-number">8</p>
                <p>Trabajando actualmente</p>
              </div>

              <div className="stat-card">
                <h3>Resueltos</h3>
                <p className="stat-number">2</p>
                <p>Esperando validación</p>
              </div>

              <div className="stat-card">
                <h3>Urgentes</h3>
                <p className="stat-number">1</p>
                <p>Prioridad alta</p>
              </div>
            </div>
          </div>

          {/* Sección de Estadísticas de Rendimiento */}
          <div className="dashboard-section">
            <h3 className="section-title">📈 Mi Rendimiento</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Tickets Este Mes</h3>
                <p className="stat-number">23</p>
                <p>Tickets completados</p>
              </div>

              <div className="stat-card">
                <h3>Tiempo Promedio</h3>
                <p className="stat-number">2.5h</p>
                <p>Por ticket resuelto</p>
              </div>

              <div className="stat-card">
                <h3>Satisfacción</h3>
                <p className="stat-number">4.8</p>
                <p>Calificación promedio</p>
              </div>

              <div className="stat-card">
                <h3>Eficiencia</h3>
                <p className="stat-number">95%</p>
                <p>Tickets resueltos a tiempo</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TecnicoDashboard;
