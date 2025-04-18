import { HomePage } from '@features/home/home-page';
import React from 'react';
import './styles/app.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <HomePage />
    </div>
  );
};

export default App;
