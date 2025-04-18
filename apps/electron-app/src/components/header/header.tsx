import React from 'react';
import './header.css';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="logo">Electron React App</div>
      <nav className="nav">
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
