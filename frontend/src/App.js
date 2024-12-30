// src/App.js
import React from 'react';
import Chatbot from './components/Chatbot';
import './App.css';
import Header from './components/Header';

function App() {
  return (
    <div className="app-container light-mode">
      <Header />
      <Chatbot />
    </div>
  );
}

export default App;
