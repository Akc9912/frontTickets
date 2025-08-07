import React, { useState } from "react";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import EngineeringIcon from "@mui/icons-material/Engineering";

/**
 * Modal para cambiar el rol de un usuario
 */
const ChangeRoleModal = ({
  isOpen,
  onClose,
  user,
  onConfirm,
  currentUserRole,
}) => {
  const [selectedRole, setSelectedRole] = useState(user?.rol || "");
  const [isLoading, setIsLoading] = useState(false);

  // Configuración de roles disponibles
  const roleConfig = {
    Trabajador: {
      label: "Trabajador",
      color: "#ff9800",
      icon: <PersonIcon />,
      description: "Usuario estándar con permisos básicos",
    },
    Tecnico: {
      label: "Técnico",
      color: "#2196f3",
      icon: <EngineeringIcon />,
      description: "Técnico con permisos de gestión de tickets",
    },
    Admin: {
      label: "Administrador",
      color: "#4caf50",
      icon: <AdminPanelSettingsIcon />,
      description: "Administrador con permisos de gestión",
    },
    SuperAdmin: {
      label: "Super Administrador",
      color: "#f44336",
      icon: <SupervisorAccountIcon />,
      description: "Máximo nivel de permisos del sistema",
    },
  };

  // Determinar roles disponibles según el usuario actual
  const getAvailableRoles = () => {
    if (currentUserRole === "SuperAdmin") {
      return ["Trabajador", "Tecnico", "Admin", "SuperAdmin"];
    } else if (currentUserRole === "Admin") {
      return ["Trabajador", "Tecnico", "Admin"];
    }
    return [];
  };

  const availableRoles = getAvailableRoles();

  const handleConfirm = async () => {
    if (!selectedRole || selectedRole === user.rol) {
      return;
    }

    setIsLoading(true);
    try {
      await onConfirm(user.id, selectedRole);
      onClose();
    } catch (error) {
      console.error("Error al cambiar rol:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setSelectedRole(user?.rol || "");
    onClose();
  };

  if (!isOpen || !user) return null;

  return (
    <div
      className="modal-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={handleClose}
    >
      <div
        className="modal-content"
        style={{
          backgroundColor: "#fff",
          borderRadius: "8px",
          width: "100%",
          maxWidth: "500px",
          margin: "20px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid #eee",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <SwapHorizIcon style={{ color: "#666", fontSize: "24px" }} />
            <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "600" }}>
              Cambiar Rol de Usuario
            </h3>
          </div>
          <button
            onClick={handleClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              borderRadius: "4px",
            }}
          >
            <CloseIcon style={{ color: "#666" }} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "24px" }}>
          {/* Info del usuario */}
          <div
            style={{
              backgroundColor: "#f8f9fa",
              padding: "16px",
              borderRadius: "6px",
              marginBottom: "24px",
              border: "1px solid #eee",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "8px",
              }}
            >
              <PersonIcon style={{ color: "#666", fontSize: "20px" }} />
              <span style={{ fontWeight: "600", fontSize: "16px" }}>
                {user.nombre}
              </span>
            </div>
            <div
              style={{ fontSize: "14px", color: "#666", marginLeft: "32px" }}
            >
              <p style={{ margin: "4px 0" }}>
                <strong>Email:</strong> {user.email}
              </p>
              <p style={{ margin: "4px 0" }}>
                <strong>Rol actual:</strong>
                <span
                  style={{
                    color: roleConfig[user.rol]?.color || "#666",
                    fontWeight: "600",
                    marginLeft: "8px",
                  }}
                >
                  {roleConfig[user.rol]?.label || user.rol}
                </span>
              </p>
            </div>
          </div>

          {/* Selector de roles */}
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "12px",
                fontSize: "14px",
                fontWeight: "600",
                color: "#333",
              }}
            >
              Seleccionar nuevo rol:
            </label>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              {availableRoles.map((role) => (
                <label
                  key={role}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "12px",
                    border: `2px solid ${
                      selectedRole === role ? roleConfig[role].color : "#ddd"
                    }`,
                    borderRadius: "6px",
                    cursor: "pointer",
                    backgroundColor:
                      selectedRole === role
                        ? `${roleConfig[role].color}10`
                        : "#fff",
                    transition: "all 0.2s",
                  }}
                >
                  <input
                    type="radio"
                    name="role"
                    value={role}
                    checked={selectedRole === role}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    style={{ marginRight: "12px" }}
                  />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      flex: 1,
                    }}
                  >
                    <span
                      style={{ color: roleConfig[role].color, display: "flex" }}
                    >
                      {roleConfig[role].icon}
                    </span>
                    <div>
                      <div
                        style={{
                          fontWeight: "600",
                          color: roleConfig[role].color,
                          fontSize: "16px",
                        }}
                      >
                        {roleConfig[role].label}
                      </div>
                      <div
                        style={{
                          fontSize: "13px",
                          color: "#666",
                          marginTop: "2px",
                        }}
                      >
                        {roleConfig[role].description}
                      </div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "16px 24px",
            borderTop: "1px solid #eee",
            display: "flex",
            justifyContent: "flex-end",
            gap: "12px",
          }}
        >
          <button
            onClick={handleClose}
            disabled={isLoading}
            style={{
              padding: "10px 20px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              backgroundColor: "#fff",
              color: "#666",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            disabled={isLoading || !selectedRole || selectedRole === user.rol}
            style={{
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              backgroundColor:
                selectedRole && selectedRole !== user.rol ? "#2196f3" : "#ccc",
              color: "#fff",
              cursor:
                selectedRole && selectedRole !== user.rol
                  ? "pointer"
                  : "not-allowed",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            {isLoading ? "Cambiando..." : "Confirmar Cambio"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeRoleModal;
