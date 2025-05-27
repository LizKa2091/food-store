import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { MessageProvider } from './context/MessageContext';
import MainPage from './pages/MainPage';
import CatalogPage from './pages/CatalogPage/CatalogPage';
import Loading from './pages/Loading';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import { CategoryProvider } from './context/CategoryContext';
import { CartProvider } from './context/CartContext';
import './App.scss';

const ProtectedProfile = lazy(() => import('./pages/protectedPages/ProtectedProfile'));
const SalesPage = lazy(() => import('./pages/SalesPage'));
const VacanciesPage = lazy(() => import('./pages/VacanciesPage/VacanciesPage'));
const ContactsPage = lazy(() => import('./pages/ContactsPage/ContactsPage'));
const CartPage = lazy(() => import('./pages/CartPage/CartPage'));

function App() {
  return (
    <AuthProvider>
      <MessageProvider>
         <CategoryProvider>
            <CartProvider>
               <BrowserRouter>
                  <Routes>
                  <Route path='/' element={<MainPage />} />
                     <Route path='/catalog' element={<CatalogPage />} />
                     <Route path='/catalog/:keyword' element={<CatalogPage />} />
                     <Route path='/profile/*' 
                        element={
                           <Suspense fallback={<Loading />}>
                              <ProtectedProfile />
                           </Suspense>
                        }
                     />
                     <Route path='/sales' 
                        element={
                           <Suspense fallback={<Loading />}>
                              <SalesPage />
                           </Suspense>
                        }
                     />
                     <Route path='/vacancies' 
                        element={
                           <Suspense fallback={<Loading />}>
                              <VacanciesPage />
                           </Suspense>
                        }
                     />
                     <Route path='/contacts' 
                        element={
                           <Suspense fallback={<Loading />}>
                              <ContactsPage />
                           </Suspense>
                        } 
                     />
                     <Route path='/cart' 
                        element={
                           <Suspense fallback={<Loading />}>
                              <CartPage />
                           </Suspense>
                        }
                     />
                     <Route path='*' element={<ErrorPage />} />
                  </Routes>
               </BrowserRouter>
            </CartProvider>
        </CategoryProvider>
      </MessageProvider>
    </AuthProvider>
  );
};

export default App;