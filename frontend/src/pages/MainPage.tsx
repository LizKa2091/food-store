import React, { FC, useEffect, useState } from 'react';
import Wrapper from '../components/layout/Wrapper';
import Header from '../components/layout/header/Header';
import Promo from '../components/layout/Promo';
import SalesAndRecommendation from '../components/UI/SalesAndRecommendation/SalesAndRecommendation';
import Categories from '../components/UI/Categories/Categories';
import Delivery from '../components/layout/Delivery';
import DeliveryBanner from '../components/layout/banners/DeliveryBanner';
import RateBanner from '../components/layout/banners/RateBanner';
import Footer from '../components/layout/Footer';
import { ModalsRenderer } from '../components/UI/ModalsRenderer';
import { categoriesList } from '../data/categories';
import MobileLowerNav from '../components/layout/header/MobileLowerNav';
import NavProfile from '../components/UI/NavProfile/NavProfile';
import { useModal } from '../context/ModalContext';

const MainPage: FC = () => {
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
                  <NavProfile isMobile={currentModal === 'mobileAuth'} setIsCatalogOpen={setIsCatalogOpen} setIsProfileOpen={setIsProfileOpen} />
               }
               <Header deviceWidth={deviceWidth} isProfileOpen={isProfileOpen} setIsProfileOpen={setIsProfileOpen} isCatalogOpen={isCatalogOpen} handleCatalogChange={handleCatalogChange} />
               <Promo deviceWidth={deviceWidth} />
               <SalesAndRecommendation type='Скидки'/>
               {categoriesList.map((category) => (
                  <Categories key={category} category={category} selectedSubcategory='' />
               ))}
               <Delivery />
               <DeliveryBanner />
               <RateBanner />
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
            <Promo deviceWidth={deviceWidth} />
            <SalesAndRecommendation type='Скидки'/>
            {categoriesList.map((category) => (
               <Categories key={category} category={category} selectedSubcategory='' />
            ))}
            <Delivery />
            <DeliveryBanner />
            <RateBanner />
            <Footer />
         </Wrapper>
         <ModalsRenderer />
      </>
   )
};

export default MainPage;