"use client"
import React from 'react';
import { ThemeToggle } from '@/src/theme/ThemeToggle';

const Header_1: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...rest }) => {
  // Styles pour le header
  const headerStyles: React.CSSProperties = {
    backgroundColor: '#ff94c2',
    padding: '10px',
  };

  const toggle_css: React.CSSProperties = {
    margin: '0 auto',
  }

  return (
    <header style={headerStyles}
      {...rest}>{children}
      <div className="container flex items-center py-2 max-w-lg m-auto gap-1">
        <div style={toggle_css}>
            <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header_1;