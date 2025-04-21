import React, { FC, useState } from 'react';
import Wrapper from '../components/layout/Wrapper';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SalesAndRecommendation from '../components/UI/SalesAndRecommendation';
import CartStep1 from '../components/UI/Cart/CartStep1';
import CartStep2 from '../components/UI/Cart/CartStep2';
import CartStep3 from '../components/UI/Cart/CartStep3';

const CartPage: FC = () => {
   const [currStep, setCurrStep] = useState<number>(1);

   const renderCartStep = () => {
      switch (currStep) {
         case 1: return <CartStep1 />
         case 2: return <CartStep2 />
         case 3: return <CartStep3 />
      }
   }

   return (
      <Wrapper>
         <Header />
         {renderCartStep()}
         <SalesAndRecommendation type='Рекомендации для вас' />
         <Footer />
    </Wrapper>
   )
};

export default CartPage;