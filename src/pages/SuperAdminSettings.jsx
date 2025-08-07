import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";

// Material Icons
import SettingsIcon from "@mui/icons-material/Settings";
import SaveIcon from "@mui/icons-material/Save";
import RestoreIcon from "@mui/icons-material/Restore";
import SecurityIcon from "@mui/icons-material/Security";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmailIcon from "@mui/icons-material/Email";
import StorageIcon from "@mui/icons-material/Storage";
import BackupIcon from "@mui/icons-material/Backup";
import UpdateIcon from "@mui/icons-material/Update";
import BugReportIcon from "@mui/icons-material/BugReport";
import InfoIcon from "@mui/icons-material/Info";

const SuperAdminSettings = () => {
  const { user } = useAuth();

  // Estados para diferentes secciones de configuración
  const [generalSettings, setGeneralSettings] = useState({
    systemName: "Sistema de Tickets",
    systemVersion: "1.0.0",
    maintenanceMode: false,
    maxTicketsPerUser: 10,
    autoAssignment: true,
    ticketNumberPrefix: "TK",
  });

  const [emailSettings, setEmailSettings] = useState({
    smtpServer: "smtp.empresa.com",
    smtpPort: 587,
    smtpUser: "sistema@empresa.com",
    smtpPassword: "********",
    enableSsl: true,
    notifyOnCreation: true,
    notifyOnAssignment: true,
    notifyOnResolution: true,
  });

  const [securitySettings, setSecuritySettings] = useState({
    sessionTimeout: 120, // minutos
    passwordMinLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    maxLoginAttempts: 5,
    lockoutDuration: 30, // minutos
    twoFactorAuth: false,
  });

  const [backupSettings, setBackupSettings] = useState({
    autoBackup: true,
    backupFrequency: "daily",
    backupRetention: 30, // días
    backupLocation: "/backups",
    lastBackup: "2024-08-06 02:00:00",
    nextBackup: "2024-08-07 02:00:00",
  });

  const [systemInfo, setSystemInfo] = useState({
    serverVersion: "Ubuntu 20.04 LTS",
    databaseVersion: "PostgreSQL 13.7",
    javaVersion: "OpenJDK 17.0.2",
    diskUsage: 45.7, // porcentaje
    memoryUsage: 62.3, // porcentaje
    cpuUsage: 23.1, // porcentaje
    uptime: "15 días, 7 horas",
  });

  const handleSaveGeneral = () => {
    // Aquí se guardarían las configuraciones generales
    alert("Configuración general guardada exitosamente");
  };

  const handleSaveEmail = () => {
    // Aquí se guardarían las configuraciones de email
    alert("Configuración de email guardada exitosamente");
  };

  const handleSaveSecurity = () => {
    // Aquí se guardarían las configuraciones de seguridad
    alert("Configuración de seguridad guardada exitosamente");
  };

  const handleBackupNow = () => {
    // Aquí se ejecutaría un backup manual
    alert("Backup iniciado. Recibirás una notificación cuando termine.");
  };

  const handleRestoreDefaults = () => {
    if (
      window.confirm(
        "¿Estás seguro de que deseas restaurar la configuración por defecto?"
      )
    ) {
      // Aquí se restaurarían los valores por defecto
      alert("Configuración restaurada a valores por defecto");
    }
  };

  return (
    <Layout>
      <div className="dashboard">
        <div className="dashboard-header">
          <h2>Configuración del Sistema</h2>
          <p>Gestiona la configuración global del sistema</p>
        </div>

        <div className="dashboard-content">
          <div className="settings-grid">
            {/* Configuración General */}
            <div className="settings-card">
              <div className="settings-header">
                <SettingsIcon className="settings-icon" />
                <h3>Configuración General</h3>
              </div>
              <div className="settings-content">
                <div className="form-group">
                  <label>Nombre del Sistema</label>
                  <input
                    type="text"
                    value={generalSettings.systemName}
                    onChange={(e) =>
                      setGeneralSettings({
                        ...generalSettings,
                        systemName: e.target.value,
                      })
                    }
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Prefijo de Tickets</label>
                  <input
                    type="text"
                    value={generalSettings.ticketNumberPrefix}
                    onChange={(e) =>
                      setGeneralSettings({
                        ...generalSettings,
                        ticketNumberPrefix: e.target.value,
                      })
                    }
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Máximo de Tickets por Usuario</label>
                  <input
                    type="number"
                    value={generalSettings.maxTicketsPerUser}
                    onChange={(e) =>
                      setGeneralSettings({
                        ...generalSettings,
                        maxTicketsPerUser: parseInt(e.target.value),
                      })
                    }
                    className="form-input"
                  />
                </div>

                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={generalSettings.maintenanceMode}
                      onChange={(e) =>
                        setGeneralSettings({
                          ...generalSettings,
                          maintenanceMode: e.target.checked,
                        })
                      }
                    />
                    Modo de Mantenimiento
                  </label>
                </div>

                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={generalSettings.autoAssignment}
                      onChange={(e) =>
                        setGeneralSettings({
                          ...generalSettings,
                          autoAssignment: e.target.checked,
                        })
                      }
                    />
                    Asignación Automática de Tickets
                  </label>
                </div>

                <button className="btn-primary" onClick={handleSaveGeneral}>
                  <SaveIcon className="btn-icon" />
                  Guardar Configuración
                </button>
              </div>
            </div>

            {/* Configuración de Email */}
            <div className="settings-card">
              <div className="settings-header">
                <EmailIcon className="settings-icon" />
                <h3>Configuración de Email</h3>
              </div>
              <div className="settings-content">
                <div className="form-group">
                  <label>Servidor SMTP</label>
                  <input
                    type="text"
                    value={emailSettings.smtpServer}
                    onChange={(e) =>
                      setEmailSettings({
                        ...emailSettings,
                        smtpServer: e.target.value,
                      })
                    }
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Puerto SMTP</label>
                  <input
                    type="number"
                    value={emailSettings.smtpPort}
                    onChange={(e) =>
                      setEmailSettings({
                        ...emailSettings,
                        smtpPort: parseInt(e.target.value),
                      })
                    }
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Usuario SMTP</label>
                  <input
                    type="email"
                    value={emailSettings.smtpUser}
                    onChange={(e) =>
                      setEmailSettings({
                        ...emailSettings,
                        smtpUser: e.target.value,
                      })
                    }
                    className="form-input"
                  />
                </div>

                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={emailSettings.enableSsl}
                      onChange={(e) =>
                        setEmailSettings({
                          ...emailSettings,
                          enableSsl: e.target.checked,
                        })
                      }
                    />
                    Habilitar SSL/TLS
                  </label>
                </div>

                <div className="notifications-section">
                  <h4>Notificaciones Automáticas</h4>
                  <div className="checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={emailSettings.notifyOnCreation}
                        onChange={(e) =>
                          setEmailSettings({
                            ...emailSettings,
                            notifyOnCreation: e.target.checked,
                          })
                        }
                      />
                      Notificar al crear ticket
                    </label>
                  </div>
                  <div className="checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={emailSettings.notifyOnAssignment}
                        onChange={(e) =>
                          setEmailSettings({
                            ...emailSettings,
                            notifyOnAssignment: e.target.checked,
                          })
                        }
                      />
                      Notificar al asignar ticket
                    </label>
                  </div>
                  <div className="checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={emailSettings.notifyOnResolution}
                        onChange={(e) =>
                          setEmailSettings({
                            ...emailSettings,
                            notifyOnResolution: e.target.checked,
                          })
                        }
                      />
                      Notificar al resolver ticket
                    </label>
                  </div>
                </div>

                <button className="btn-primary" onClick={handleSaveEmail}>
                  <SaveIcon className="btn-icon" />
                  Guardar Configuración
                </button>
              </div>
            </div>

            {/* Configuración de Seguridad */}
            <div className="settings-card">
              <div className="settings-header">
                <SecurityIcon className="settings-icon" />
                <h3>Configuración de Seguridad</h3>
              </div>
              <div className="settings-content">
                <div className="form-group">
                  <label>Timeout de Sesión (minutos)</label>
                  <input
                    type="number"
                    value={securitySettings.sessionTimeout}
                    onChange={(e) =>
                      setSecuritySettings({
                        ...securitySettings,
                        sessionTimeout: parseInt(e.target.value),
                      })
                    }
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Longitud Mínima de Contraseña</label>
                  <input
                    type="number"
                    value={securitySettings.passwordMinLength}
                    onChange={(e) =>
                      setSecuritySettings({
                        ...securitySettings,
                        passwordMinLength: parseInt(e.target.value),
                      })
                    }
                    className="form-input"
                  />
                </div>

                <div className="password-requirements">
                  <h4>Requisitos de Contraseña</h4>
                  <div className="checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={securitySettings.requireUppercase}
                        onChange={(e) =>
                          setSecuritySettings({
                            ...securitySettings,
                            requireUppercase: e.target.checked,
                          })
                        }
                      />
                      Requerir mayúsculas
                    </label>
                  </div>
                  <div className="checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={securitySettings.requireNumbers}
                        onChange={(e) =>
                          setSecuritySettings({
                            ...securitySettings,
                            requireNumbers: e.target.checked,
                          })
                        }
                      />
                      Requerir números
                    </label>
                  </div>
                  <div className="checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={securitySettings.requireSpecialChars}
                        onChange={(e) =>
                          setSecuritySettings({
                            ...securitySettings,
                            requireSpecialChars: e.target.checked,
                          })
                        }
                      />
                      Requerir caracteres especiales
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label>Máximo Intentos de Login</label>
                  <input
                    type="number"
                    value={securitySettings.maxLoginAttempts}
                    onChange={(e) =>
                      setSecuritySettings({
                        ...securitySettings,
                        maxLoginAttempts: parseInt(e.target.value),
                      })
                    }
                    className="form-input"
                  />
                </div>

                <button className="btn-primary" onClick={handleSaveSecurity}>
                  <SaveIcon className="btn-icon" />
                  Guardar Configuración
                </button>
              </div>
            </div>

            {/* Configuración de Backups */}
            <div className="settings-card">
              <div className="settings-header">
                <BackupIcon className="settings-icon" />
                <h3>Backups y Mantenimiento</h3>
              </div>
              <div className="settings-content">
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={backupSettings.autoBackup}
                      onChange={(e) =>
                        setBackupSettings({
                          ...backupSettings,
                          autoBackup: e.target.checked,
                        })
                      }
                    />
                    Backup Automático
                  </label>
                </div>

                <div className="form-group">
                  <label>Frecuencia de Backup</label>
                  <select
                    value={backupSettings.backupFrequency}
                    onChange={(e) =>
                      setBackupSettings({
                        ...backupSettings,
                        backupFrequency: e.target.value,
                      })
                    }
                    className="form-select"
                  >
                    <option value="daily">Diario</option>
                    <option value="weekly">Semanal</option>
                    <option value="monthly">Mensual</option>
                  </select>
                </div>

                <div className="backup-info">
                  <div className="info-item">
                    <span className="info-label">Último Backup:</span>
                    <span className="info-value">
                      {backupSettings.lastBackup}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Próximo Backup:</span>
                    <span className="info-value">
                      {backupSettings.nextBackup}
                    </span>
                  </div>
                </div>

                <div className="backup-actions">
                  <button className="btn-secondary" onClick={handleBackupNow}>
                    <BackupIcon className="btn-icon" />
                    Backup Ahora
                  </button>
                  <button
                    className="btn-warning"
                    onClick={handleRestoreDefaults}
                  >
                    <RestoreIcon className="btn-icon" />
                    Restaurar Defaults
                  </button>
                </div>
              </div>
            </div>

            {/* Información del Sistema */}
            <div className="settings-card">
              <div className="settings-header">
                <InfoIcon className="settings-icon" />
                <h3>Información del Sistema</h3>
              </div>
              <div className="settings-content">
                <div className="system-info">
                  <div className="info-group">
                    <h4>Versiones</h4>
                    <div className="info-item">
                      <span className="info-label">Sistema:</span>
                      <span className="info-value">
                        {generalSettings.systemVersion}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Servidor:</span>
                      <span className="info-value">
                        {systemInfo.serverVersion}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Base de Datos:</span>
                      <span className="info-value">
                        {systemInfo.databaseVersion}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Java:</span>
                      <span className="info-value">
                        {systemInfo.javaVersion}
                      </span>
                    </div>
                  </div>

                  <div className="info-group">
                    <h4>Recursos del Sistema</h4>
                    <div className="resource-item">
                      <span className="resource-label">Uso de Disco:</span>
                      <div className="resource-bar">
                        <div
                          className="resource-progress"
                          style={{ width: `${systemInfo.diskUsage}%` }}
                        ></div>
                      </div>
                      <span className="resource-value">
                        {systemInfo.diskUsage}%
                      </span>
                    </div>
                    <div className="resource-item">
                      <span className="resource-label">Memoria:</span>
                      <div className="resource-bar">
                        <div
                          className="resource-progress"
                          style={{ width: `${systemInfo.memoryUsage}%` }}
                        ></div>
                      </div>
                      <span className="resource-value">
                        {systemInfo.memoryUsage}%
                      </span>
                    </div>
                    <div className="resource-item">
                      <span className="resource-label">CPU:</span>
                      <div className="resource-bar">
                        <div
                          className="resource-progress"
                          style={{ width: `${systemInfo.cpuUsage}%` }}
                        ></div>
                      </div>
                      <span className="resource-value">
                        {systemInfo.cpuUsage}%
                      </span>
                    </div>
                  </div>

                  <div className="info-group">
                    <div className="info-item">
                      <span className="info-label">Tiempo Activo:</span>
                      <span className="info-value">{systemInfo.uptime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SuperAdminSettings;
