import React from 'react';
import './App.css';
import Header from './components/layout/Header';
import Promo from './components/layout/Promo';
import Categories from './components/UI/Categories';
import Wrapper from './components/layout/Wrapper';
import Delivery from './components/layout/Delivery';
import SalesAndRecommendation from './components/UI/SalesAndRecommendation';
import Footer from './components/layout/Footer';
import { AuthContext, AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Wrapper>
        <Header />
        <Promo />
        <SalesAndRecommendation type='Скидки'/>
        <Categories category="Супермаркет" />
        <Categories category="Кулинария"/>
        <Categories category="Заморозка"/>
        <Categories category="Другое"/>
        <Categories category="Акции"/>
        <Delivery />
        <Footer />
    </Wrapper>
    </AuthProvider>
  );
}

export default App;
