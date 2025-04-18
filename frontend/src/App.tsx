import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { MessageProvider } from './context/MessageContext';
import MainPage from './pages/MainPage';
import CatalogPage from './pages/CatalogPage';
import ProtectedProfile from './pages/protectedPages/ProtectedProfile';
import Loading from './pages/Loading';
import SalesPage from './pages/SalesPage';
import VacanciesPage from './pages/VacanciesPage';
import ContactsPage from './pages/ContactsPage';
import { CategoryProvider } from './context/CategoryContext';
import './App.scss';

const ErrorPage = lazy(() => import('./pages/ErrorPage'));

function App() {
  return (
    <AuthProvider>
      <MessageProvider>
         <CategoryProvider>
            <BrowserRouter>
               <Routes>
                  <Route path='/' element={<MainPage />} />
                  <Route path='/catalog' element={<CatalogPage />} />
                  <Route path='/profile' element={<ProtectedProfile />} />
                  <Route path='/profile/:section' element={<ProtectedProfile />} />
                  <Route path='/sales' element={<SalesPage />} />
                  <Route path='/vacancies' element={<VacanciesPage />} />
                  <Route path='/contacts' element={<ContactsPage />} />
                  <Route path='*' 
                     element={ 
                        <Suspense fallback={<Loading />}>
                           <ErrorPage />
                        </Suspense> 
                     }
                  />
               </Routes>
            </BrowserRouter>
        </CategoryProvider>
      </MessageProvider>
    </AuthProvider>
  );
};

export default App;