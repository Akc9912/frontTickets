import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import DescriptionIcon from "@mui/icons-material/Description";
import PersonIcon from "@mui/icons-material/Person";
import BuildIcon from "@mui/icons-material/Build";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import RefreshIcon from "@mui/icons-material/Refresh";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import {
  getEstadoIcon,
  getEstadoLabel,
  getEstadoColor,
} from "../../utils/ticketUtils";

// Mapeo de nombres de iconos a componentes
const iconMap = {
  Assignment: AssignmentIcon,
  AssignmentInd: AssignmentIndIcon,
  Refresh: RefreshIcon,
  CheckCircle: CheckCircleIcon,
  TaskAlt: TaskAltIcon,
  ConfirmationNumber: ConfirmationNumberIcon,
};

// Componente para renderizar el icono del estado
const EstadoIcon = ({ estado }) => {
  const { icon, color } = getEstadoIcon(estado);
  const IconComponent = iconMap[icon] || ConfirmationNumberIcon;
  return <IconComponent style={{ color }} />;
};

const TicketCard = ({
  ticket,
  isExpanded,
  onToggleExpansion,
  onEdit,
  onAssignTechnician,
  onChangeStatus,
  onViewDetails,
  showActions = true,
  userRole = "SuperAdmin",
}) => {
  const formatDateTime = (dateTimeStr) => {
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
        onClick={() => onToggleExpansion(ticket.id)}
        style={{ cursor: "pointer" }}
      >
        <div className="user-basic-info">
          <div className="user-avatar">#{ticket.id}</div>
          <div className="user-main-details">
            <div className="user-name">{ticket.titulo}</div>
            <div className="user-email-small">
              Solicitante:{" "}
              {ticket.creador?.nombre || ticket.solicitante?.nombre}
            </div>
          </div>
        </div>

        <div className="user-summary">
          <span
            className="status-badge"
            style={{
              backgroundColor: "white",
              border: `2px solid ${getEstadoColor(ticket.estado)}`,
              color: getEstadoColor(ticket.estado),
            }}
          >
            {getEstadoLabel(ticket.estado)}
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
              <h4>Descripción del Ticket</h4>
              <div className="detail-item">
                <DescriptionIcon className="detail-icon" />
                <div>
                  <span className="detail-value">{ticket.descripcion}</span>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h4>Información del Solicitante</h4>
              <div className="detail-item">
                <PersonIcon className="detail-icon" />
                <div>
                  <span className="detail-label">Nombre:</span>
                  <span className="detail-value">
                    {ticket.creador?.nombre || ticket.solicitante?.nombre}
                  </span>
                </div>
              </div>
              <div className="detail-item">
                <div>
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">
                    {ticket.creador?.email || ticket.solicitante?.email}
                  </span>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h4>Asignación y Estado</h4>
              <div className="detail-item">
                {ticket.tecnicoAsignado ? (
                  <BuildIcon
                    className="detail-icon"
                    style={{ color: "#2196f3" }}
                  />
                ) : (
                  <AssignmentIcon
                    className="detail-icon"
                    style={{ color: "#ff9800" }}
                  />
                )}
                <div>
                  <span className="detail-label">Técnico Asignado:</span>
                  <span className="detail-value">
                    {ticket.tecnicoAsignado
                      ? `${ticket.tecnicoAsignado.nombre} (${ticket.tecnicoAsignado.email})`
                      : "Sin asignar"}
                  </span>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h4>Fechas</h4>
              <div className="detail-item">
                <CalendarTodayIcon className="detail-icon" />
                <div>
                  <span className="detail-label">Fecha de Creación:</span>
                  <span className="detail-value">
                    {formatDateTime(ticket.fechaCreacion)}
                  </span>
                </div>
              </div>
              <div className="detail-item">
                <AccessTimeIcon className="detail-icon" />
                <div>
                  <span className="detail-label">Última Actualización:</span>
                  <span className="detail-value">
                    {formatDateTime(
                      ticket.fechaUltimaActualizacion ||
                        ticket.fechaActualizacion
                    )}
                  </span>
                </div>
              </div>
            </div>

            {showActions && (
              <div className="detail-section">
                <h4>Acciones</h4>
                <div className="expanded-actions">
                  <button
                    className="btn-action edit"
                    title="Ver detalles del ticket"
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewDetails?.(ticket);
                    }}
                  >
                    <VisibilityIcon />
                    Ver Detalles
                  </button>

                  {(userRole === "SuperAdmin" || userRole === "Admin") && (
                    <button
                      className="btn-action role"
                      title="Editar ticket"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit?.(ticket);
                      }}
                    >
                      <EditIcon />
                      Editar
                    </button>
                  )}

                  {(userRole === "SuperAdmin" || userRole === "Admin") && (
                    <button
                      className="btn-action block"
                      title="Asignar técnico"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAssignTechnician?.(ticket);
                      }}
                    >
                      <AssignmentIndIcon />
                      Asignar Técnico
                    </button>
                  )}

                  {(userRole === "SuperAdmin" ||
                    userRole === "Admin" ||
                    userRole === "Tecnico") && (
                    <button
                      className="btn-action reset-password"
                      title="Cambiar estado"
                      onClick={(e) => {
                        e.stopPropagation();
                        onChangeStatus?.(ticket);
                      }}
                    >
                      <EstadoIcon estado={ticket.estado} />
                      Cambiar Estado
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketCard;
