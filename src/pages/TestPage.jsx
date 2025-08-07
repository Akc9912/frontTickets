import React from "react";

const TestPage = () => {
  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Prueba de Estilos</h2>
        <p className="login-subtitle">
          Si puedes ver esto con colores y estilos, los CSS funcionan
        </p>
        <div className="form-group">
          <label>Campo de prueba:</label>
          <input type="text" placeholder="Escribe algo aquí..." />
        </div>
        <button className="login-btn">Botón de Prueba</button>
      </div>
    </div>
  );
};

export default TestPage;
