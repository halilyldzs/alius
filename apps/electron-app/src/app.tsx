import { HomePage } from '@features/home/home-page';
import React from 'react';
import './styles/app.css';

const App: React.FC = () => {
  return (
    <div className="app min-h-screen bg-gray-100 text-gray-900 flex flex-col items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">
          Electron App with Tailwind CSS v4
        </h1>
        <HomePage />
      </div>
    </div>
  );
};

export default App;
