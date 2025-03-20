import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { MessageProvider } from './context/MessageContext';
import MainPage from './pages/MainPage';
import ProfilePage from './pages/ProfilePage';
import CatalogPage from './pages/CatalogPage';
import ErrorPage from './pages/ErrorPage';
import './App.scss';
import ProtectedProfile from './pages/protected-pages/ProtectedProfile';

function App() {
  
  return (
    <AuthProvider>
      <MessageProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/catalog' element={<CatalogPage />} />
            <Route path='/profile' element={<ProtectedProfile />} />
            <Route path='/profile/:section' element={<ProtectedProfile />} />
          </Routes>
        </BrowserRouter>
      </MessageProvider>
    </AuthProvider>
  );
};

export default App;