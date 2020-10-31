import React from "react";
import "./Button.css";

function Button({ children, handleClick }) {
  const isOperator = (value) => {
    return !isNaN(value) || value === "." || value === "=";
  };

  return (
    <div
      className={`button-wrapper ${isOperator(children) ? null : "operator"}`}
      onClick={() => handleClick(children)}
    >
      {children}
    </div>
  );
}

export default Button;
