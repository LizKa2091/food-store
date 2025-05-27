import React, { FC } from 'react';
import Wrapper from '../components/layout/Wrapper';
import Header from '../components/layout/header/Header';
import Categories from '../components/UI/Categories/Categories';
import SalesAndRecommendation from '../components/UI/SalesAndRecommendation/SalesAndRecommendation';
import Footer from '../components/layout/Footer';
import Feedback from '../components/UI/Feedback/Feedback';
import { ModalsRenderer } from '../components/UI/ModalsRenderer';

const SalesPage: FC = () => {
   return (
      <>
         <Wrapper>
            <Header />
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