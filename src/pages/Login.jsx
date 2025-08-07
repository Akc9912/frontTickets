import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(""); // Limpiar error al escribir
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await login(formData);
      const userRole = response.usuario.rol;

      // Redirigir según el rol del usuario
      switch (userRole) {
        case "SUPERADMIN":
          navigate("/superadmin/dashboard");
          break;
        case "ADMIN":
          navigate("/admin/dashboard");
          break;
        case "TECNICO":
          navigate("/tecnico/dashboard");
          break;
        case "TRABAJADOR":
          navigate("/trabajador/dashboard");
          break;
        default:
          navigate("/dashboard");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Iniciar Sesión</h2>
        <p className="login-subtitle">Sistema de Gestión de Tickets</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
              placeholder="usuario@empresa.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>
        </form>

        <div className="login-help">
          <p>¿Olvidaste tu contraseña? Contacta al administrador.</p>

          {/* Usuarios de prueba para desarrollo */}
          <div
            className="demo-users"
            style={{
              marginTop: "20px",
              padding: "15px",
              backgroundColor: "#f8f9fa",
              borderRadius: "4px",
              fontSize: "12px",
            }}
          >
            <h4 style={{ margin: "0 0 10px 0", color: "#333" }}>
              👨‍💻 Usuarios de Prueba:
            </h4>
            <div style={{ display: "grid", gap: "8px" }}>
              <div>
                <strong>SuperAdmin:</strong> admin@example.com
              </div>
              <div>
                <strong>Admin:</strong> admin2@example.com
              </div>
              <div>
                <strong>Técnico:</strong> tecnico@example.com
              </div>
              <div>
                <strong>Trabajador:</strong> trabajador@example.com
              </div>
              <div style={{ marginTop: "8px", fontStyle: "italic" }}>
                <strong>Contraseña para todos:</strong> 123456
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
