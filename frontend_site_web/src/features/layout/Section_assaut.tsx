import React from 'react';

const Section_assaut: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...rest }) => {
  // Styles pour la Section d'Assaut
  const SectionStyles: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: '30px',
  };

  return <section style={SectionStyles} {...rest}>{children}</section>;
};

export default Section_assaut;