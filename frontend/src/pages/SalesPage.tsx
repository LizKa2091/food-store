import React, { FC, useEffect, useState } from 'react';
import Wrapper from '../components/layout/Wrapper';
import Header from '../components/layout/header/Header';
import Categories from '../components/UI/Categories/Categories';
import SalesAndRecommendation from '../components/UI/SalesAndRecommendation/SalesAndRecommendation';
import Footer from '../components/layout/Footer';
import Feedback from '../components/UI/Feedback/Feedback';
import { ModalsRenderer } from '../components/UI/ModalsRenderer';
import MobileLowerNav from '../components/layout/header/MobileLowerNav';
import NavProfile from '../components/UI/NavProfile/NavProfile';
import { useModal } from '../context/ModalContext';

const SalesPage: FC = () => {
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

   const handleCatalogChange = (): void => {
      setIsCatalogOpen((prev: boolean) => !prev);
   };
   
   if (deviceWidth <= 768) {
      return (
         <>
            <Wrapper>
               <MobileLowerNav isProfileOpen={isProfileOpen} setIsProfileOpen={setIsProfileOpen} handleCatalogChange={handleCatalogChange} />
               {isProfileOpen &&
                  <NavProfile isMobile={currentModal === 'mobileAuth'} setIsProfileOpen={setIsProfileOpen} />
               }
               <Header deviceWidth={deviceWidth} isProfileOpen={isProfileOpen} setIsProfileOpen={setIsProfileOpen} isCatalogOpen={isCatalogOpen} handleCatalogChange={handleCatalogChange} />
               <Categories category='Акции' type='extended'/>
               <SalesAndRecommendation type='Рекомендации для вас' />
               <Feedback />
               <Footer />
            </Wrapper>
            <ModalsRenderer />
         </>
      )
   }

   return (
      <>
         <Wrapper>
            <Header deviceWidth={deviceWidth} isProfileOpen={isProfileOpen} setIsProfileOpen={setIsProfileOpen} isCatalogOpen={isCatalogOpen} handleCatalogChange={handleCatalogChange} />
            <Categories category='Акции' type='extended'/>
            <SalesAndRecommendation type='Рекомендации для вас' />
            <Feedback />
            <Footer />
         </Wrapper>
         <ModalsRenderer />
      </>
   )
};

export default SalesPage;