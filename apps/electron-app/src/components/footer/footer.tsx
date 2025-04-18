import React from 'react';
import './footer.css';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Electron React App. All rights reserved.</p>
    </footer>
  );
};
