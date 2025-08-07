import React from "react";
import IconButton from "../common/IconButton";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";

// Ejemplo de uso del componente IconButton modular
const ExampleUsage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        padding: "20px",
      }}
    >
      <h3>Ejemplos de uso del componente IconButton</h3>

      {/* Botón de guardar - Verde */}
      <IconButton
        icon={SaveIcon}
        text="Guardar"
        onClick={() => console.log("Guardando...")}
        backgroundColor="#fff"
        hoverColor="#e8f5e8"
        textColor="#4caf50"
        borderColor="#4caf50"
      />

      {/* Botón de cancelar - Rojo */}
      <IconButton
        icon={CancelIcon}
        text="Cancelar"
        onClick={() => console.log("Cancelando...")}
        backgroundColor="#fff"
        hoverColor="#ffebee"
        textColor="#f44336"
        borderColor="#f44336"
      />

      {/* Botón de agregar - Azul */}
      <IconButton
        icon={AddIcon}
        text="Agregar"
        onClick={() => console.log("Agregando...")}
        backgroundColor="#fff"
        hoverColor="#e3f2fd"
        textColor="#2196f3"
        borderColor="#2196f3"
      />

      {/* Botón de descargar - Púrpura */}
      <IconButton
        icon={DownloadIcon}
        text="Descargar"
        onClick={() => console.log("Descargando...")}
        backgroundColor="#fff"
        hoverColor="#f3e5f5"
        textColor="#9c27b0"
        borderColor="#9c27b0"
      />

      {/* Botón deshabilitado */}
      <IconButton
        icon={SaveIcon}
        text="Guardar (Deshabilitado)"
        onClick={() => console.log("No debería ejecutarse")}
        backgroundColor="#fff"
        hoverColor="#f5f5f5"
        textColor="#999"
        borderColor="#ddd"
        disabled={true}
      />

      {/* Botón con colores personalizados */}
      <IconButton
        icon={AddIcon}
        text="Botón Custom"
        onClick={() => console.log("Botón personalizado")}
        backgroundColor="#fff3e0"
        hoverColor="#ffe0b2"
        textColor="#ff9800"
        borderColor="#ff9800"
      />
    </div>
  );
};

export default ExampleUsage;
