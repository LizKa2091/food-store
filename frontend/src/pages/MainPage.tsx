import React, { FC, useState } from 'react';
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
   const { currentModal } = useModal();

   return (
      <>
         <Wrapper>
            {isProfileOpen &&
               <NavProfile isMobile={currentModal === 'mobileAuth'} setIsProfileOpen={setIsProfileOpen} />
            }
            <MobileLowerNav isProfileOpen={isProfileOpen} setIsProfileOpen={setIsProfileOpen}/>
            <Header isProfileOpen={isProfileOpen} setIsProfileOpen={setIsProfileOpen} />
            <Promo />
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