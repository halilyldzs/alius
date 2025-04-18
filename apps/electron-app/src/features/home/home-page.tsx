import { Footer } from '@components/footer/footer';
import { Header } from '@components/header/header';
import React from 'react';
import './home-page.css';

export const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <Header />
      <main className="home-content">
        <h1>Welcome to Electron + React App</h1>
        <p>This is a feature-based structure with TypeScript</p>
      </main>
      <Footer />
    </div>
  );
};
