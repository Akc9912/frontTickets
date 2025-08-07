import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import BlockIcon from "@mui/icons-material/Block";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockResetIcon from "@mui/icons-material/LockReset";
import DeleteIcon from "@mui/icons-material/Delete";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import IconButton from "../common/IconButton";

/**
 * Componente de botones de acciones inline para usuarios
 * Muestra los botones directamente en la tarjeta
 */
const UserActionButtons = ({
  user,
  userRole,
  onEdit,
  onToggleStatus,
  onResetPassword,
  onDelete,
  onChangeRole,
  canEdit = true,
  canToggleStatus = true,
  canResetPassword = true,
  canDelete = true,
  canChangeRole = true,
}) => {
  // Verificar permisos específicos
  const permissions = {
    canEdit: canEdit && userRole,
    canToggleStatus: canToggleStatus && userRole,
    canResetPassword: canResetPassword && userRole,
    canDelete:
      canDelete &&
      (userRole === "SuperAdmin" || userRole === "Admin") &&
      !(userRole === "SuperAdmin" && user.rol === "SuperAdmin"),
    canChangeRole:
      canChangeRole &&
      (userRole === "SuperAdmin" ||
        (userRole === "Admin" && user.rol !== "SuperAdmin")),
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        width: "100%",
        maxWidth: "180px",
      }}
    >
      {permissions.canEdit && (
        <IconButton
          icon={EditIcon}
          text="Editar"
          onClick={(e) => {
            e.stopPropagation();
            onEdit?.(user);
          }}
          backgroundColor="#fff"
          hoverColor="#e3f2fd"
          textColor="#2196f3"
          borderColor="#2196f3"
          title="Editar usuario"
        />
      )}

      {permissions.canToggleStatus && (
        <IconButton
          icon={user.activo ? BlockIcon : LockOpenIcon}
          text={user.activo ? "Bloquear" : "Activar"}
          onClick={(e) => {
            e.stopPropagation();
            onToggleStatus?.(user.id, user.activo);
          }}
          backgroundColor="#fff"
          hoverColor={user.activo ? "#fff3e0" : "#e8f5e8"}
          textColor={user.activo ? "#ff9800" : "#4caf50"}
          borderColor={user.activo ? "#ff9800" : "#4caf50"}
          title={user.activo ? "Desactivar usuario" : "Activar usuario"}
        />
      )}

      {permissions.canResetPassword && (
        <IconButton
          icon={LockResetIcon}
          text="Reset"
          onClick={(e) => {
            e.stopPropagation();
            onResetPassword?.(user.id);
          }}
          backgroundColor="#fff"
          hoverColor="#f3e5f5"
          textColor="#9c27b0"
          borderColor="#9c27b0"
          title="Restablecer contraseña"
        />
      )}

      {permissions.canChangeRole && (
        <IconButton
          icon={SwapHorizIcon}
          text="Cambiar Rol"
          onClick={(e) => {
            e.stopPropagation();
            onChangeRole?.(user);
          }}
          backgroundColor="#fff"
          hoverColor="#eceff1"
          textColor="#607d8b"
          borderColor="#607d8b"
          title="Cambiar rol"
        />
      )}

      {permissions.canDelete && (
        <IconButton
          icon={DeleteIcon}
          text="Eliminar"
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.(user.id);
          }}
          backgroundColor="#fff"
          hoverColor="#ffebee"
          textColor="#f44336"
          borderColor="#f44336"
          title="Eliminar usuario"
        />
      )}
    </div>
  );
};

export default UserActionButtons;
