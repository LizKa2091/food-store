import React from 'react';
import './App.css';
import Header from './components/layout/Header';
import Promo from './components/layout/Promo';
import Categories from './components/UI/Categories';
import Wrapper from './components/layout/Wrapper';
import Delivery from './components/layout/Delivery';

function App() {
  return (
    <Wrapper>
      <Header />
      <Promo />
      <Categories category="Супермаркет" />
      <Categories category="Кулинария"/>
      <Categories category="Заморозка"/>
      <Categories category="Другое"/>
      <Categories category="Акции"/>
      <Delivery />
    </Wrapper>
  );
}

export default App;
