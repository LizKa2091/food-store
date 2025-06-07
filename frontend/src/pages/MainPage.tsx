import React, { FC } from 'react';
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

const MainPage: FC = () => {
   return (
      <>
         <Wrapper>
            <Header />
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