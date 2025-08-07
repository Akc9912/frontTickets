import React from "react";

const IconButton = ({
  icon: Icon,
  text,
  onClick,
  backgroundColor = "#fff",
  hoverColor = "#f5f5f5",
  textColor = "#333",
  borderColor = "#ddd",
  disabled = false,
  className = "",
  ...props
}) => {
  // Generate unique ID for this button instance
  const buttonId = React.useMemo(
    () => `icon-button-${Math.random().toString(36).substr(2, 9)}`,
    []
  );

  const buttonStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "8px 12px",
    backgroundColor: backgroundColor,
    color: textColor,
    border: `1px solid ${borderColor}`,
    borderRadius: "4px",
    cursor: disabled ? "not-allowed" : "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.2s ease",
    opacity: disabled ? 0.6 : 1,
    minWidth: "120px",
    height: "36px",
    outline: "none",
    position: "relative",
    overflow: "hidden",
  };

  const spanStyle = {
    backgroundColor: "transparent !important",
    background: "transparent !important",
    color: "inherit",
    pointerEvents: "none",
    zIndex: 1,
    position: "relative",
  };

  const iconStyle = {
    fontSize: "16px",
    backgroundColor: "transparent !important",
    background: "transparent !important",
    color: "inherit",
    pointerEvents: "none",
    zIndex: 1,
    position: "relative",
  };

  // CSS styles for hover effect
  const hoverStyles = `
    #${buttonId}:hover:not(:disabled) {
      background-color: ${hoverColor} !important;
    }
    #${buttonId}:hover:not(:disabled) span {
      background-color: transparent !important;
      background: transparent !important;
    }
    #${buttonId}:hover:not(:disabled) svg {
      background-color: transparent !important;
      background: transparent !important;
    }
  `;

  return (
    <>
      <style>{hoverStyles}</style>
      <button
        id={buttonId}
        style={buttonStyle}
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        className={className}
        {...props}
      >
        {Icon && <Icon style={iconStyle} />}
        <span style={spanStyle}>{text}</span>
      </button>
    </>
  );
};

export default IconButton;
