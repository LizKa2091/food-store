import React, { FC, useEffect, useState } from 'react';
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
   const [isCatalogOpen, setIsCatalogOpen] = useState<boolean>(false);
   const [deviceWidth, setDeviceWidth] = useState<number>(window.innerWidth);

   const { currentModal } = useModal();

   useEffect(() => {
      const handleWindowResize = () => {
         setDeviceWidth(window.innerWidth);
      };

      window.addEventListener('windowResize', handleWindowResize);

      handleWindowResize();
      return () => window.removeEventListener('windowResize', handleWindowResize);
   }, []);


   const handleStepChange = (step: number): void => {
      setCurrStep(step)
   };

   const renderCartStep = () => {
      switch (currStep) {
         case 1: 
            return (
               <CartStep1 deviceWidth={deviceWidth}>
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
   };

   const handleCatalogChange = (): void => {
      setIsCatalogOpen((prev: boolean) => !prev);
   };

   if (deviceWidth <= 768) {
      return (
         <>
            <Wrapper>
               <MobileLowerNav isProfileOpen={isProfileOpen} setIsProfileOpen={setIsProfileOpen} handleCatalogChange={handleCatalogChange} />
               {isProfileOpen &&
                  <NavProfile isMobile={currentModal === 'mobileAuth'} setIsCatalogOpen={setIsCatalogOpen} setIsProfileOpen={setIsProfileOpen} />
               }
               <Header deviceWidth={deviceWidth} isProfileOpen={isProfileOpen} setIsProfileOpen={setIsProfileOpen} isCatalogOpen={isCatalogOpen} handleCatalogChange={handleCatalogChange} />
               {renderCartStep()}
               <SalesAndRecommendation type='Рекомендации для вас' />
               <Footer />
            </Wrapper>
            <ModalsRenderer />
         </>   
      );
   }

   return (
      <>
         <Wrapper>
            <Header deviceWidth={deviceWidth} isProfileOpen={isProfileOpen} setIsProfileOpen={setIsProfileOpen} isCatalogOpen={isCatalogOpen} handleCatalogChange={handleCatalogChange} />
            {renderCartStep()}
            <SalesAndRecommendation type='Рекомендации для вас' />
            <Footer />
         </Wrapper>
         <ModalsRenderer />
      </>   
   )
};

export default CartPage;