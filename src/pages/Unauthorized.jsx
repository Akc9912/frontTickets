import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="error-container">
      <div className="error-content">
        <h1>403</h1>
        <h2>Acceso No Autorizado</h2>
        <p>No tienes permisos para acceder a esta página.</p>
        <div className="error-actions">
          <button onClick={() => navigate(-1)} className="btn-secondary">
            Volver Atrás
          </button>
          <button onClick={() => navigate("/login")} className="btn-primary">
            Ir al Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
