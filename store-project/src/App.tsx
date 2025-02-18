import React from 'react';
import './App.css';
import Header from './components/layout/Header';
import Promo from './components/layout/Promo';
import Categories from './components/UI/Categories';
import Wrapper from './components/layout/Wrapper';

function App() {
  return (
    <Wrapper>
      <Header />
      <Promo />
      <Categories category="Супермаркет" />
    </Wrapper>
  );
}

export default App;
