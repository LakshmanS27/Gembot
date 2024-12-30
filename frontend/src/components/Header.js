import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src="/logo.png" alt="GemBot Logo" className="logo-image" />
        <span className="logo-text">GemBot</span>
      </div>
    </header>
  );
};

export default Header;
