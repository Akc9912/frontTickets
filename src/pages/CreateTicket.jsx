import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";
import { ticketsAPI } from "../services/api";

// Material Icons
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import TitleIcon from "@mui/icons-material/Title";
import DescriptionIcon from "@mui/icons-material/Description";
import CategoryIcon from "@mui/icons-material/Category";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

const CreateTicket = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    categoria: "SOFTWARE",
    prioridad: "MEDIA",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const categorias = [
    { value: "SOFTWARE", label: "Software" },
    { value: "HARDWARE", label: "Hardware" },
    { value: "NETWORK", label: "Red/Conectividad" },
    { value: "OTHER", label: "Otros" },
  ];

  const prioridades = [
    { value: "BAJA", label: "Baja" },
    { value: "MEDIA", label: "Media" },
    { value: "ALTA", label: "Alta" },
    { value: "CRITICA", label: "Crítica" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(""); // Limpiar error al escribir
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Validaciones
      if (!formData.titulo.trim()) {
        throw new Error("El título es obligatorio");
      }
      if (!formData.descripcion.trim()) {
        throw new Error("La descripción es obligatoria");
      }
      if (formData.descripcion.length < 10) {
        throw new Error("La descripción debe tener al menos 10 caracteres");
      }

      // Crear el ticket
      const newTicket = await ticketsAPI.create(formData);

      // Redirigir según el rol del usuario
      if (user.rol === "SUPERADMIN") {
        navigate("/superadmin/tickets");
      } else if (user.rol === "ADMIN") {
        navigate("/admin/tickets");
      } else if (user.rol === "TECNICO") {
        navigate("/tecnico/tickets");
      } else {
        navigate("/trabajador/tickets");
      }

      // Mostrar mensaje de éxito (opcional)
      console.log("Ticket creado exitosamente:", newTicket);
    } catch (err) {
      setError(err.message || "Error al crear el ticket");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Redirigir según el rol del usuario
    if (user.rol === "SUPERADMIN") {
      navigate("/superadmin/tickets");
    } else if (user.rol === "ADMIN") {
      navigate("/admin/tickets");
    } else if (user.rol === "TECNICO") {
      navigate("/tecnico/tickets");
    } else {
      navigate("/trabajador/tickets");
    }
  };

  return (
    <Layout>
      <div className="dashboard">
        <div className="dashboard-header">
          <h2>
            <ConfirmationNumberIcon
              style={{ marginRight: "10px", verticalAlign: "middle" }}
            />
            Crear Nuevo Ticket
          </h2>
          <p>Completa la información para crear un nuevo ticket de soporte</p>
        </div>

        <div className="dashboard-content">
          <div
            className="form-container"
            style={{ maxWidth: "800px", margin: "0 auto" }}
          >
            {error && (
              <div
                className="error-message"
                style={{
                  backgroundColor: "#ffebee",
                  color: "#c62828",
                  padding: "12px",
                  borderRadius: "4px",
                  marginBottom: "20px",
                  border: "1px solid #ef5350",
                }}
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="ticket-form">
              {/* Título del ticket */}
              <div className="form-group">
                <label htmlFor="titulo">
                  <TitleIcon
                    style={{ marginRight: "8px", verticalAlign: "middle" }}
                  />
                  Título del Ticket *
                </label>
                <input
                  type="text"
                  id="titulo"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleChange}
                  placeholder="Ingresa un título descriptivo del problema"
                  maxLength={200}
                  required
                  disabled={loading}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    fontSize: "16px",
                  }}
                />
                <small style={{ color: "#666", fontSize: "12px" }}>
                  {formData.titulo.length}/200 caracteres
                </small>
              </div>

              {/* Descripción del ticket */}
              <div className="form-group">
                <label htmlFor="descripcion">
                  <DescriptionIcon
                    style={{ marginRight: "8px", verticalAlign: "middle" }}
                  />
                  Descripción del Problema *
                </label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  placeholder="Describe detalladamente el problema que estás experimentando, incluyendo pasos para reproducirlo si es posible"
                  rows={6}
                  maxLength={1000}
                  required
                  disabled={loading}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    fontSize: "16px",
                    resize: "vertical",
                    minHeight: "120px",
                  }}
                />
                <small style={{ color: "#666", fontSize: "12px" }}>
                  {formData.descripcion.length}/1000 caracteres (mínimo 10)
                </small>
              </div>

              {/* Categoría */}
              <div
                className="form-row"
                style={{ display: "flex", gap: "20px" }}
              >
                <div className="form-group" style={{ flex: 1 }}>
                  <label htmlFor="categoria">
                    <CategoryIcon
                      style={{ marginRight: "8px", verticalAlign: "middle" }}
                    />
                    Categoría
                  </label>
                  <select
                    id="categoria"
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleChange}
                    disabled={loading}
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "16px",
                    }}
                  >
                    {categorias.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Prioridad */}
                <div className="form-group" style={{ flex: 1 }}>
                  <label htmlFor="prioridad">
                    <PriorityHighIcon
                      style={{ marginRight: "8px", verticalAlign: "middle" }}
                    />
                    Prioridad
                  </label>
                  <select
                    id="prioridad"
                    name="prioridad"
                    value={formData.prioridad}
                    onChange={handleChange}
                    disabled={loading}
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "16px",
                    }}
                  >
                    {prioridades.map((pri) => (
                      <option key={pri.value} value={pri.value}>
                        {pri.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Información adicional */}
              <div
                className="info-section"
                style={{
                  backgroundColor: "#f5f5f5",
                  padding: "15px",
                  borderRadius: "4px",
                  marginTop: "20px",
                }}
              >
                <h4 style={{ margin: "0 0 10px 0", color: "#333" }}>
                  Información del Solicitante
                </h4>
                <p style={{ margin: "5px 0", color: "#666" }}>
                  <strong>Nombre:</strong> {user?.nombre}
                </p>
                <p style={{ margin: "5px 0", color: "#666" }}>
                  <strong>Email:</strong> {user?.email}
                </p>
                <p style={{ margin: "5px 0", color: "#666" }}>
                  <strong>Rol:</strong> {user?.rol}
                </p>
              </div>

              {/* Botones de acción */}
              <div
                className="form-actions"
                style={{
                  display: "flex",
                  gap: "15px",
                  justifyContent: "flex-end",
                  marginTop: "30px",
                  paddingTop: "20px",
                  borderTop: "1px solid #eee",
                }}
              >
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={loading}
                  style={{
                    padding: "12px 24px",
                    backgroundColor: "#757575",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: loading ? "not-allowed" : "pointer",
                    opacity: loading ? 0.6 : 1,
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "16px",
                  }}
                >
                  <CancelIcon />
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={
                    loading ||
                    !formData.titulo.trim() ||
                    !formData.descripcion.trim()
                  }
                  style={{
                    padding: "12px 24px",
                    backgroundColor: "#2196f3",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor:
                      loading ||
                      !formData.titulo.trim() ||
                      !formData.descripcion.trim()
                        ? "not-allowed"
                        : "pointer",
                    opacity:
                      loading ||
                      !formData.titulo.trim() ||
                      !formData.descripcion.trim()
                        ? 0.6
                        : 1,
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "16px",
                  }}
                >
                  <SaveIcon />
                  {loading ? "Creando..." : "Crear Ticket"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateTicket;
