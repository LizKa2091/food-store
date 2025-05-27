import React, { FC, useState } from 'react';
import Wrapper from '../../components/layout/Wrapper';
import Header from '../../components/layout/header/Header';
import Footer from '../../components/layout/Footer';
import SalesAndRecommendation from '../../components/UI/SalesAndRecommendation/SalesAndRecommendation';
import CartStep1 from '../../components/UI/Cart/CartStep1';
import CartStep2 from '../../components/UI/Cart/CartStep2';
import CartPanel from '../../components/UI/Cart/CartPanel';
import { ModalsRenderer } from '../../components/UI/ModalsRenderer';

const CartPage: FC = () => {
   const [currStep, setCurrStep] = useState<number>(1);

   const handleStepChange = (step: number) => {
      setCurrStep(step)
   };

   const renderCartStep = () => {
      switch (currStep) {
         case 1: 
            return (
               <CartStep1>
                  <CartPanel handleStepChange={handleStepChange} step={currStep} />
               </CartStep1>
            )
         case 2:
            return (
               <CartStep2>
                  <CartPanel handleStepChange={handleStepChange} step={currStep} />
               </CartStep2>
            )
      }
   }

   return (
      <>
         <Wrapper>
            <Header />
            {renderCartStep()}
            <SalesAndRecommendation type='Рекомендации для вас' />
            <Footer />
         </Wrapper>
         <ModalsRenderer />
      </>   
   )
};

export default CartPage;