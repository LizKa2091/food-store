import React, { FC, useState } from 'react';
import Wrapper from '../components/layout/Wrapper';
import Header from '../components/layout/Header';
import Categories from '../components/UI/Categories/Categories';
import SalesAndRecommendation from '../components/UI/SalesAndRecommendation/SalesAndRecommendation';
import Footer from '../components/layout/Footer';
import Feedback from '../components/UI/Feedback/Feedback';

const SalesPage: FC = () => {
   const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

   const handleModalChange = (modalState: boolean) => {
     setIsModalOpened(modalState);
   };

   return (
      <>
         <Wrapper modalState={isModalOpened}>
            <Header />
            <Categories category='Акции' type='extended'/>
            <SalesAndRecommendation onModalChange={ handleModalChange } type='Рекомендации для вас' />
            <Feedback />
            <Footer />
         </Wrapper>
      </>
   )
};

export default SalesPage;