import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Páginas
import Login from "./pages/Login";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import SuperAdminUsers from "./pages/SuperAdminUsers";
import SuperAdminAdmins from "./pages/SuperAdminAdmins";
import SuperAdminTickets from "./pages/SuperAdminTickets";
import SuperAdminReports from "./pages/SuperAdminReports";
import SuperAdminSettings from "./pages/SuperAdminSettings";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminTickets from "./pages/AdminTickets";
import TecnicoDashboard from "./pages/TecnicoDashboard";
import TecnicoTickets from "./pages/TecnicoTickets";
import TrabajadorDashboard from "./pages/TrabajadorDashboard";
import TrabajadorTickets from "./pages/TrabajadorTickets";
import CreateTicket from "./pages/CreateTicket";
import Unauthorized from "./pages/Unauthorized";

import "./App.css";

// Componente para redireccionar al dashboard correcto
const DashboardRedirect = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  switch (user.rol) {
    case "SUPERADMIN":
      return <Navigate to="/superadmin/dashboard" replace />;
    case "ADMIN":
      return <Navigate to="/admin/dashboard" replace />;
    case "TECNICO":
      return <Navigate to="/tecnico/dashboard" replace />;
    case "TRABAJADOR":
      return <Navigate to="/trabajador/dashboard" replace />;
    default:
      return <Navigate to="/unauthorized" replace />;
  }
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Ruta pública */}
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Rutas protegidas por rol */}
            <Route
              path="/superadmin/dashboard"
              element={
                <ProtectedRoute requiredRole="SUPERADMIN">
                  <SuperAdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/superadmin/users"
              element={
                <ProtectedRoute requiredRole="SUPERADMIN">
                  <SuperAdminUsers />
                </ProtectedRoute>
              }
            />
            {/* Ruta eliminada - Administradores incluidos en Gestión de Usuarios
            <Route
              path="/superadmin/admins"
              element={
                <ProtectedRoute requiredRole="SUPERADMIN">
                  <SuperAdminAdmins />
                </ProtectedRoute>
              }
            />
            */}
            <Route
              path="/superadmin/tickets"
              element={
                <ProtectedRoute requiredRole="SUPERADMIN">
                  <SuperAdminTickets />
                </ProtectedRoute>
              }
            />
            <Route
              path="/superadmin/tickets/create"
              element={
                <ProtectedRoute requiredRole="SUPERADMIN">
                  <CreateTicket />
                </ProtectedRoute>
              }
            />
            <Route
              path="/superadmin/reports"
              element={
                <ProtectedRoute requiredRole="SUPERADMIN">
                  <SuperAdminReports />
                </ProtectedRoute>
              }
            />
            <Route
              path="/superadmin/settings"
              element={
                <ProtectedRoute requiredRole="SUPERADMIN">
                  <SuperAdminSettings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <AdminUsers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/tickets"
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <AdminTickets />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/tickets/create"
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <CreateTicket />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tecnico/dashboard"
              element={
                <ProtectedRoute requiredRole="TECNICO">
                  <TecnicoDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tecnico/tickets"
              element={
                <ProtectedRoute requiredRole="TECNICO">
                  <TecnicoTickets />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tecnico/tickets/create"
              element={
                <ProtectedRoute requiredRole="TECNICO">
                  <CreateTicket />
                </ProtectedRoute>
              }
            />
            <Route
              path="/trabajador/dashboard"
              element={
                <ProtectedRoute requiredRole="TRABAJADOR">
                  <TrabajadorDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/trabajador/tickets"
              element={
                <ProtectedRoute requiredRole="TRABAJADOR">
                  <TrabajadorTickets />
                </ProtectedRoute>
              }
            />
            <Route
              path="/trabajador/tickets/create"
              element={
                <ProtectedRoute requiredRole="TRABAJADOR">
                  <CreateTicket />
                </ProtectedRoute>
              }
            />

            {/* Redirección automática al dashboard correcto */}
            <Route path="/dashboard" element={<DashboardRedirect />} />

            {/* Ruta por defecto */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Ruta catch-all para 404 */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
