import React, { FC, useState } from 'react';
import Wrapper from '../../components/layout/Wrapper';
import Header from '../../components/layout/header/Header';
import Footer from '../../components/layout/Footer';
import SalesAndRecommendation from '../../components/UI/SalesAndRecommendation/SalesAndRecommendation';
import CartStep1 from '../../components/UI/Cart/CartStep1';
import CartStep2 from '../../components/UI/Cart/CartStep2';
import CartPanel from '../../components/UI/Cart/CartPanel';
import { ModalsRenderer } from '../../components/UI/ModalsRenderer';
import MobileLowerNav from '../../components/layout/header/MobileLowerNav';
import { useModal } from '../../context/ModalContext';
import NavProfile from '../../components/UI/NavProfile/NavProfile';

const CartPage: FC = () => {
   const [currStep, setCurrStep] = useState<number>(1);
   const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

   const { currentModal } = useModal();

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
            {isProfileOpen &&
               <NavProfile isMobile={currentModal === 'mobileAuth'} setIsProfileOpen={setIsProfileOpen} />
            }
            <MobileLowerNav isProfileOpen={isProfileOpen} setIsProfileOpen={setIsProfileOpen} />
            <Header isProfileOpen={isProfileOpen} setIsProfileOpen={setIsProfileOpen} />
            {renderCartStep()}
            <SalesAndRecommendation type='Рекомендации для вас' />
            <Footer />
         </Wrapper>
         <ModalsRenderer />
      </>   
   )
};

export default CartPage;