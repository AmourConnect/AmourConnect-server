import React from 'react';

const Main_1: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...rest }) => {
  // Styles pour la Main
  const MainStyles: React.CSSProperties = {
    padding: "20px"
  };

  return <main style={MainStyles} {...rest}>{children}</main>;
};

export default Main_1;