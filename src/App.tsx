import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Router from './Router';
import './styles/App.css';

function App() {
  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}

export default App;