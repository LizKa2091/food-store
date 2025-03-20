import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { MessageProvider } from './context/MessageContext';
import MainPage from './pages/MainPage';
import ProfilePage from './pages/ProfilePage';
import CatalogPage from './pages/CatalogPage';
import ProtectedProfile from './pages/protectedPages/ProtectedProfile';
import Loading from './pages/Loading';
import './App.scss';

const ErrorPage = lazy(() => import('./pages/ErrorPage'));

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
            <Route path='*' 
               element={ 
                  <Suspense fallback={<Loading />}>
                     <ErrorPage />
                  </Suspense> 
               }
            />
          </Routes>
        </BrowserRouter>
      </MessageProvider>
    </AuthProvider>
  );
};

export default App;