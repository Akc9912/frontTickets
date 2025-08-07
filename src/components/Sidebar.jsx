import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

// Material Icons
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import BuildIcon from "@mui/icons-material/Build";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import LogoutIcon from "@mui/icons-material/Logout";

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getMenuItems = () => {
    const baseItems = [
      {
        icon: <DashboardIcon />,
        label: "Dashboard",
        path: `/${user?.rol?.toLowerCase()}/dashboard`,
      },
    ];

    switch (user?.rol) {
      case "SUPERADMIN":
        return [
          ...baseItems,
          {
            icon: <SupervisorAccountIcon />,
            label: "Gestión Usuarios",
            path: "/superadmin/users",
          },
          {
            icon: <ConfirmationNumberIcon />,
            label: "Gestión de Tickets",
            path: "/superadmin/tickets",
          },
          {
            icon: <AddIcon />,
            label: "Crear Ticket",
            path: "/superadmin/tickets/create",
          },
          {
            icon: <BarChartIcon />,
            label: "Reportes Globales",
            path: "/superadmin/reports",
          },
          {
            icon: <SettingsIcon />,
            label: "Configuración",
            path: "/superadmin/settings",
          },
        ];

      case "ADMIN":
        return [
          ...baseItems,
          { icon: <PeopleIcon />, label: "Usuarios", path: "/admin/users" },
          {
            icon: <ConfirmationNumberIcon />,
            label: "Tickets",
            path: "/admin/tickets",
          },
          {
            icon: <AddIcon />,
            label: "Crear Ticket",
            path: "/admin/tickets/create",
          },
          {
            icon: <AssignmentIcon />,
            label: "Asignaciones",
            path: "/admin/assignments",
          },
          { icon: <BarChartIcon />, label: "Reportes", path: "/admin/reports" },
          {
            icon: <BuildIcon />,
            label: "Técnicos",
            path: "/admin/technicians",
          },
        ];

      case "TECNICO":
        return [
          ...baseItems,
          {
            icon: <ConfirmationNumberIcon />,
            label: "Mis Tickets",
            path: "/tecnico/tickets",
          },
          {
            icon: <AddIcon />,
            label: "Crear Ticket",
            path: "/tecnico/tickets/create",
          },
          {
            icon: <AssignmentIcon />,
            label: "Asignados",
            path: "/tecnico/assigned",
          },
          {
            icon: <BarChartIcon />,
            label: "Mi Rendimiento",
            path: "/tecnico/performance",
          },
          {
            icon: <NotificationsIcon />,
            label: "Notificaciones",
            path: "/tecnico/notifications",
          },
        ];

      case "TRABAJADOR":
        return [
          ...baseItems,
          {
            icon: <AddIcon />,
            label: "Crear Ticket",
            path: "/trabajador/tickets/create",
          },
          {
            icon: <ConfirmationNumberIcon />,
            label: "Mis Tickets",
            path: "/trabajador/tickets",
          },
          {
            icon: <NotificationsIcon />,
            label: "Notificaciones",
            path: "/trabajador/notifications",
          },
          {
            icon: <PersonIcon />,
            label: "Mi Perfil",
            path: "/trabajador/profile",
          },
        ];

      default:
        return baseItems;
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className={`sidebar ${isCollapsed ? "sidebar-collapsed" : ""}`}>
      <div className="sidebar-header">
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          <MenuIcon />
        </button>
        {!isCollapsed && (
          <div className="sidebar-brand">
            <h3>Sistema Tickets</h3>
          </div>
        )}
      </div>

      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          {getMenuItems().map((item, index) => (
            <li key={index} className="sidebar-menu-item">
              <button
                className={`sidebar-menu-button ${
                  isActive(item.path) ? "active" : ""
                }`}
                onClick={() => handleNavigation(item.path)}
                title={isCollapsed ? item.label : ""}
              >
                <span className="sidebar-menu-icon">{item.icon}</span>
                {!isCollapsed && (
                  <span className="sidebar-menu-label">{item.label}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button
          className="sidebar-logout-button"
          onClick={handleLogout}
          title={isCollapsed ? "Cerrar Sesión" : ""}
        >
          <span className="sidebar-menu-icon">
            <LogoutIcon />
          </span>
          {!isCollapsed && (
            <span className="sidebar-menu-label">Cerrar Sesión</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
