import React from 'react';

const FormulaireContainer: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...rest }) => {
  // Styles pour le formulaire container
  const FormStyles: React.CSSProperties = {
    width: "300px",
    margin: "100px auto",
    padding: "20px",
    backgroundColor: "#ff94c2",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    color: "white",
  };

  return <div style={FormStyles} {...rest}>{children}</div>;
};

export default FormulaireContainer;