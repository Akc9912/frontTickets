import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import BlockIcon from "@mui/icons-material/Block";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockResetIcon from "@mui/icons-material/LockReset";
import DeleteIcon from "@mui/icons-material/Delete";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

/**
 * Versión simplificada del dropdown para testing
 */
const SimpleUserActionsDropdown = ({ user, userRole, onEdit }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "8px",
          borderRadius: "4px",
        }}
      >
        <MoreVertIcon style={{ color: "#666" }} />
      </button>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            right: "0",
            minWidth: "180px",
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            borderRadius: "4px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            zIndex: 999,
          }}
        >
          <button
            onClick={() => {
              onEdit?.(user);
              setIsOpen(false);
            }}
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
            }}
          >
            <EditIcon style={{ fontSize: "16px", color: "#666" }} />
            <span>Editar Usuario</span>
          </button>

          <button
            onClick={() => {
              console.log("Reset password:", user.id);
              setIsOpen(false);
            }}
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
            }}
          >
            <LockResetIcon style={{ fontSize: "16px", color: "#666" }} />
            <span>Reset Password</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default SimpleUserActionsDropdown;
