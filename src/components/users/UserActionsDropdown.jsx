import React, { useState, useRef, useEffect } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import BlockIcon from "@mui/icons-material/Block";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockResetIcon from "@mui/icons-material/LockReset";
import DeleteIcon from "@mui/icons-material/Delete";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import PersonIcon from "@mui/icons-material/Person";

/**
 * Componente de desplegable de acciones para usuarios
 * Muestra las 5 acciones principales: Editar, Bloquear/Desbloquear, Reset Password, Eliminar, Cambiar Rol
 */
const UserActionsDropdown = ({
  user,
  userRole,
  onEdit = () => console.log("onEdit not provided"),
  onToggleStatus = () => console.log("onToggleStatus not provided"),
  onResetPassword = () => console.log("onResetPassword not provided"),
  onDelete = () => console.log("onDelete not provided"),
  onChangeRole = () => console.log("onChangeRole not provided"),
  canEdit = true,
  canToggleStatus = true,
  canResetPassword = true,
  canDelete = true,
  canChangeRole = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Validaciones básicas
  if (!user) {
    console.log("UserActionsDropdown: user is null/undefined");
    return null;
  }

  if (!userRole) {
    console.log("UserActionsDropdown: userRole is null/undefined");
    return null;
  }

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Verificar permisos específicos - Simplificado para debug
  const permissions = {
    canEdit: true, // Simplificar para debug
    canToggleStatus: true,
    canResetPassword: true,
    canDelete:
      canDelete &&
      (userRole === "SuperAdmin" || userRole === "Admin") &&
      !(userRole === "SuperAdmin" && user.rol === "SuperAdmin"),
    canChangeRole:
      canChangeRole &&
      (userRole === "SuperAdmin" ||
        (userRole === "Admin" && user.rol !== "SuperAdmin")),
  };

  // Debug: Log permisos para troubleshooting
  console.log("UserActionsDropdown Debug:", {
    user: user.nombre,
    userRole,
    permissions,
    canEdit,
    canToggleStatus,
    canResetPassword,
    canDelete,
    canChangeRole,
  });

  const handleAction = (action, ...args) => {
    action?.(...args);
    setIsOpen(false);
  };

  // Configuración de acciones
  const actions = [
    {
      id: "edit",
      label: "Editar Usuario",
      icon: <EditIcon />,
      onClick: () => handleAction(onEdit, user),
      permission: permissions.canEdit,
      className: "action-edit",
    },
    {
      id: "toggle-status",
      label: user.activo ? "Bloquear Usuario" : "Desbloquear Usuario",
      icon: user.activo ? <BlockIcon /> : <LockOpenIcon />,
      onClick: () => handleAction(onToggleStatus, user.id, user.activo),
      permission: permissions.canToggleStatus,
      className: user.activo ? "action-block" : "action-unblock",
    },
    {
      id: "reset-password",
      label: "Restablecer Contraseña",
      icon: <LockResetIcon />,
      onClick: () => handleAction(onResetPassword, user.id),
      permission: permissions.canResetPassword,
      className: "action-reset",
    },
    {
      id: "change-role",
      label: "Cambiar Rol",
      icon: <SwapHorizIcon />,
      onClick: () => handleAction(onChangeRole, user),
      permission: permissions.canChangeRole,
      className: "action-role",
    },
    {
      id: "delete",
      label: "Eliminar Usuario",
      icon: <DeleteIcon />,
      onClick: () => handleAction(onDelete, user.id),
      permission: permissions.canDelete,
      className: "action-delete",
    },
  ];

  // Filtrar acciones según permisos
  const availableActions = actions.filter((action) => action.permission);

  // Debug: Log acciones disponibles
  console.log(
    "Available actions:",
    availableActions.length,
    availableActions.map((a) => a.id)
  );

  // Siempre mostrar al menos el trigger para debug
  if (availableActions.length === 0) {
    console.log("No actions available");
    return null; // Temporalmente retornar null si no hay acciones
  }

  return (
    <div className="user-actions-dropdown" ref={dropdownRef}>
      <button
        className="dropdown-trigger"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        title="Acciones de usuario"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "8px",
          borderRadius: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background-color 0.2s",
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "#f5f5f5";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "transparent";
        }}
      >
        <MoreVertIcon style={{ color: "#666", fontSize: "20px" }} />
      </button>

      {isOpen && (
        <>
          {/* Overlay para cerrar dropdown */}
          <div
            className="dropdown-overlay"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 998,
              background: "transparent",
            }}
            onClick={() => setIsOpen(false)}
          />

          {/* Menú desplegable */}
          <div
            className="dropdown-menu"
            style={{
              position: "absolute",
              top: "100%",
              right: "0",
              minWidth: "200px",
              backgroundColor: "#fff",
              border: "1px solid #ddd",
              borderRadius: "4px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              zIndex: 999,
              overflow: "hidden",
            }}
          >
            {/* Header del dropdown */}
            <div
              style={{
                padding: "12px 16px",
                borderBottom: "1px solid #eee",
                backgroundColor: "#f8f9fa",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <PersonIcon style={{ fontSize: "16px", color: "#666" }} />
              <span
                style={{ fontSize: "14px", fontWeight: "600", color: "#333" }}
              >
                {user.nombre}
              </span>
            </div>

            {/* Lista de acciones */}
            <div className="dropdown-actions">
              {availableActions.map((action) => (
                <button
                  key={action.id}
                  className={`dropdown-action ${action.className}`}
                  onClick={action.onClick}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "none",
                    background: "none",
                    textAlign: "left",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    fontSize: "14px",
                    color: action.id === "delete" ? "#d32f2f" : "#333",
                    transition: "background-color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor =
                      action.id === "delete" ? "#ffebee" : "#f5f5f5";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: action.id === "delete" ? "#d32f2f" : "#666",
                    }}
                  >
                    {action.icon}
                  </span>
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserActionsDropdown;
