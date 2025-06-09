import React, { FC, useState } from 'react';
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
   const { currentModal } = useModal();
   
   return (
      <>
         <Wrapper>
            {isProfileOpen &&
               <NavProfile isMobile={currentModal === 'mobileAuth'} setIsProfileOpen={setIsProfileOpen} />
            }
            <MobileLowerNav isProfileOpen={isProfileOpen} setIsProfileOpen={setIsProfileOpen} />
            <Header isProfileOpen={isProfileOpen} setIsProfileOpen={setIsProfileOpen} />
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