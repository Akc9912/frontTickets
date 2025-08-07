import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";

// Material Icons
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import SecurityIcon from "@mui/icons-material/Security";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";

const SuperAdminAdmins = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  // Datos simulados - en una implementación real vendrían de la API
  const [admins, setAdmins] = useState([
    {
      id: 1,
      nombre: "Juan",
      apellido: "Pérez",
      email: "juan.perez@empresa.com",
      activo: true,
      fechaCreacion: "2024-01-15",
      ultimoAcceso: "2024-08-06",
      permisos: ["GESTION_USUARIOS", "GESTION_TICKETS", "REPORTES"],
      ticketsGestionados: 45,
      usuariosAsignados: 12,
    },
    {
      id: 2,
      nombre: "María",
      apellido: "González",
      email: "maria.gonzalez@empresa.com",
      activo: true,
      fechaCreacion: "2024-02-10",
      ultimoAcceso: "2024-08-05",
      permisos: ["GESTION_USUARIOS", "GESTION_TICKETS"],
      ticketsGestionados: 38,
      usuariosAsignados: 8,
    },
    {
      id: 3,
      nombre: "Carlos",
      apellido: "López",
      email: "carlos.lopez@empresa.com",
      activo: false,
      fechaCreacion: "2024-03-20",
      ultimoAcceso: "2024-07-28",
      permisos: ["GESTION_TICKETS"],
      ticketsGestionados: 23,
      usuariosAsignados: 5,
    },
  ]);

  const filteredAdmins = admins.filter((admin) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      admin.nombre.toLowerCase().includes(searchLower) ||
      admin.apellido.toLowerCase().includes(searchLower) ||
      admin.email.toLowerCase().includes(searchLower)
    );
  });

  const handleToggleStatus = (adminId) => {
    setAdmins(
      admins.map((admin) =>
        admin.id === adminId ? { ...admin, activo: !admin.activo } : admin
      )
    );
  };

  const handleDeleteAdmin = (adminId) => {
    if (
      window.confirm("¿Estás seguro de que deseas eliminar este administrador?")
    ) {
      setAdmins(admins.filter((admin) => admin.id !== adminId));
    }
  };

  const getPermissionLabel = (permission) => {
    switch (permission) {
      case "GESTION_USUARIOS":
        return "Gestión de Usuarios";
      case "GESTION_TICKETS":
        return "Gestión de Tickets";
      case "REPORTES":
        return "Reportes";
      default:
        return permission;
    }
  };

  return (
    <Layout>
      <div className="dashboard">
        <div className="dashboard-header">
          <h2>Gestión de Administradores</h2>
          <p>Administra los usuarios con rol de administrador</p>
        </div>

        <div className="dashboard-content">
          {/* Estadísticas rápidas */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon admin">
                <AdminPanelSettingsIcon />
              </div>
              <div className="stat-content">
                <h3>{admins.length}</h3>
                <p>Total Administradores</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon active">
                <CheckCircleIcon />
              </div>
              <div className="stat-content">
                <h3>{admins.filter((a) => a.activo).length}</h3>
                <p>Administradores Activos</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon security">
                <SecurityIcon />
              </div>
              <div className="stat-content">
                <h3>
                  {admins.reduce((sum, a) => sum + a.ticketsGestionados, 0)}
                </h3>
                <p>Tickets Gestionados</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon supervisor">
                <SupervisorAccountIcon />
              </div>
              <div className="stat-content">
                <h3>
                  {admins.reduce((sum, a) => sum + a.usuariosAsignados, 0)}
                </h3>
                <p>Usuarios Asignados</p>
              </div>
            </div>
          </div>

          {/* Controles */}
          <div className="table-controls">
            <div className="search-section">
              <div className="search-box">
                <SearchIcon className="search-icon" />
                <input
                  type="text"
                  placeholder="Buscar administradores..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>

            <div className="filters-section">
              <button className="btn-primary">
                <AddIcon className="btn-icon" />
                Nuevo Administrador
              </button>
            </div>
          </div>

          {/* Lista de administradores */}
          <div className="admin-grid">
            {filteredAdmins.map((admin) => (
              <div key={admin.id} className="admin-card">
                <div className="admin-header">
                  <div className="admin-avatar">
                    <AdminPanelSettingsIcon />
                  </div>
                  <div className="admin-info">
                    <h3>
                      {admin.nombre} {admin.apellido}
                    </h3>
                    <p>{admin.email}</p>
                  </div>
                  <div className="admin-status">
                    <span
                      className={`status-badge ${
                        admin.activo ? "active" : "inactive"
                      }`}
                    >
                      {admin.activo ? "Activo" : "Inactivo"}
                    </span>
                  </div>
                </div>

                <div className="admin-stats">
                  <div className="stat-item">
                    <span className="stat-label">Tickets Gestionados</span>
                    <span className="stat-value">
                      {admin.ticketsGestionados}
                    </span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Usuarios Asignados</span>
                    <span className="stat-value">
                      {admin.usuariosAsignados}
                    </span>
                  </div>
                </div>

                <div className="admin-permissions">
                  <h4>Permisos</h4>
                  <div className="permissions-list">
                    {admin.permisos.map((permission, index) => (
                      <span key={index} className="permission-tag">
                        {getPermissionLabel(permission)}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="admin-dates">
                  <div className="date-item">
                    <span className="date-label">Creado:</span>
                    <span className="date-value">{admin.fechaCreacion}</span>
                  </div>
                  <div className="date-item">
                    <span className="date-label">Último acceso:</span>
                    <span className="date-value">{admin.ultimoAcceso}</span>
                  </div>
                </div>

                <div className="admin-actions">
                  <button className="btn-action edit" title="Editar">
                    <EditIcon />
                  </button>
                  <button
                    className={`btn-action ${
                      admin.activo ? "deactivate" : "activate"
                    }`}
                    onClick={() => handleToggleStatus(admin.id)}
                    title={admin.activo ? "Desactivar" : "Activar"}
                  >
                    {admin.activo ? <CancelIcon /> : <CheckCircleIcon />}
                  </button>
                  <button
                    className="btn-action delete"
                    onClick={() => handleDeleteAdmin(admin.id)}
                    title="Eliminar"
                  >
                    <DeleteIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Información de resultados */}
          <div className="table-footer">
            <p>
              Mostrando {filteredAdmins.length} de {admins.length}{" "}
              administradores
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SuperAdminAdmins;
