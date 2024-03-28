"use client"
import React from 'react';

const Footer_1: React.FC = () => {
  // Styles pour le Footer
  const FooterStyles: React.CSSProperties = {
    background: '#ff94c2',
    textAlign: 'center',
    padding: '10px',
    position: 'fixed',
    bottom: '0',
    width: '100%',
  };

  return (
    <footer style={FooterStyles}>
            <p>&copy; 2024 AmourConnect</p>
    </footer>
  );
};

export default Footer_1;