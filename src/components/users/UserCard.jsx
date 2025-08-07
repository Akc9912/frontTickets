import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { getRoleColor, getRoleLabel } from "../../utils/ticketUtils";
import UserActionButtons from "./UserActionButtons";
import ChangeRoleModal from "./ChangeRoleModal";

const UserCard = ({
  user,
  isExpanded,
  onToggleExpansion,
  onEdit,
  onDelete,
  onToggleStatus,
  onResetPassword,
  onChangeRole,
  userRole = "SuperAdmin",
  canDelete = true,
  canEdit = true,
  canToggleStatus = true,
  canChangeRole = true,
}) => {
  const [isChangeRoleModalOpen, setIsChangeRoleModalOpen] = useState(false);
  const formatDateTime = (dateTimeStr) => {
    if (!dateTimeStr) return "N/A";
    const date = new Date(dateTimeStr);
    return date.toLocaleString("es-ES", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="user-card">
      <div
        className="user-card-header"
        onClick={() => onToggleExpansion(user.id)}
        style={{ cursor: "pointer" }}
      >
        <div className="user-basic-info">
          <div className="user-avatar">
            <PersonIcon />
          </div>
          <div className="user-main-details">
            <div className="user-name">{user.nombre}</div>
            <div className="user-email-small">{user.email}</div>
          </div>
        </div>

        <div className="user-summary">
          <span
            className="status-badge"
            style={{
              backgroundColor: "white",
              border: `2px solid ${getRoleColor(user.rol)}`,
              color: getRoleColor(user.rol),
              marginRight: "10px",
            }}
          >
            {getRoleLabel(user.rol)}
          </span>

          <span
            className="status-badge"
            style={{
              backgroundColor: user.activo ? "#e8f5e8" : "#ffebee",
              color: user.activo ? "#2e7d32" : "#c62828",
              border: `1px solid ${user.activo ? "#4caf50" : "#f44336"}`,
            }}
          >
            {user.activo ? "Activo" : "Inactivo"}
          </span>

          <button className="expand-button" type="button">
            {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </button>
        </div>
      </div>

      {/* Detalles expandibles */}
      {isExpanded && (
        <div className="user-expanded-details">
          <div className="expanded-content">
            <div className="detail-section">
              <h4>Información Personal</h4>
              <div className="detail-item">
                <PersonIcon className="detail-icon" />
                <div>
                  <span className="detail-label">Nombre:</span>
                  <span className="detail-value">{user.nombre}</span>
                </div>
              </div>
              <div className="detail-item">
                <EmailIcon className="detail-icon" />
                <div>
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">{user.email}</span>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h4>Información del Sistema</h4>
              <div className="detail-item">
                <BadgeIcon className="detail-icon" />
                <div>
                  <span className="detail-label">Rol:</span>
                  <span className="detail-value">{getRoleLabel(user.rol)}</span>
                </div>
              </div>
              <div className="detail-item">
                <CalendarTodayIcon className="detail-icon" />
                <div>
                  <span className="detail-label">Fecha de Creación:</span>
                  <span className="detail-value">
                    {formatDateTime(user.fechaCreacion)}
                  </span>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h4>Acciones</h4>
              <div
                className="expanded-actions"
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  padding: "8px 0",
                  minHeight: "50px",
                }}
              >
                <UserActionButtons
                  user={user}
                  userRole={userRole}
                  onEdit={onEdit}
                  onToggleStatus={onToggleStatus}
                  onResetPassword={onResetPassword}
                  onDelete={onDelete}
                  onChangeRole={() => setIsChangeRoleModalOpen(true)}
                  canEdit={canEdit}
                  canToggleStatus={canToggleStatus}
                  canResetPassword={true}
                  canDelete={canDelete}
                  canChangeRole={canChangeRole}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de cambio de rol */}
      <ChangeRoleModal
        isOpen={isChangeRoleModalOpen}
        onClose={() => setIsChangeRoleModalOpen(false)}
        user={user}
        currentUserRole={userRole}
        onConfirm={async (userId, newRole) => {
          await onChangeRole?.(userId, newRole);
          setIsChangeRoleModalOpen(false);
        }}
      />
    </div>
  );
};

export default UserCard;
