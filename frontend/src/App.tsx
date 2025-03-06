import React from 'react';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import MainPage from './pages/MainPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
