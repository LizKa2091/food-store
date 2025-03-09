import React from 'react';
import './App.scss';
import { AuthProvider } from './context/AuthContext';
import MainPage from './pages/MainPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
