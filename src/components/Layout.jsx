import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const { user } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const getRoleDisplayName = (role) => {
    const roleNames = {
      SUPERADMIN: "SuperAdmin",
      ADMIN: "Administrador",
      TECNICO: "Técnico",
      TRABAJADOR: "Trabajador",
    };
    return roleNames[role] || role;
  };

  return (
    <div className="layout-with-sidebar">
      <header className="header">
        <div className="header-content">
          <h1 className="logo">Sistema de Tickets</h1>
          {user && (
            <div className="user-info">
              <span className="user-name">
                {user.nombre} {user.apellido}
              </span>
              <span className="user-role">{getRoleDisplayName(user.rol)}</span>
            </div>
          )}
        </div>
      </header>

      <div className="layout-body">
        <Sidebar isCollapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
        <main
          className={`main-content-with-sidebar ${
            sidebarCollapsed ? "sidebar-collapsed" : ""
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
