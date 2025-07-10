import React, { FC, useEffect, useState } from 'react';
import Wrapper from '../../components/layout/Wrapper';
import Header from '../../components/layout/header/Header';
import UserProfileInfo from '../../components/layout/userProfile/UserProfileInfo';
import Footer from '../../components/layout/Footer';
import { ModalsRenderer } from '../../components/UI/ModalsRenderer';
import MobileLowerNav from '../../components/layout/header/MobileLowerNav';
import NavProfile from '../../components/UI/NavProfile/NavProfile';
import { useModal } from '../../context/ModalContext';
import './ProfilePage.scss';

interface IProfilePageProps {
   section: string;
};

const ProfilePage: FC<IProfilePageProps> = ({ section }) => {
   const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
   const [isCatalogOpen, setIsCatalogOpen] = useState<boolean>(false);
   const [deviceWidth, setDeviceWidth] = useState<number>(window.innerWidth);

   const { currentModal } = useModal();

   useEffect(() => {
      const handleWindowResize = () => {
         setDeviceWidth(window.innerWidth);
      };

      console.log(window.innerWidth)
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
               <h2 className='title'>Личный кабинет</h2>
               <UserProfileInfo section={section}/>
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
            <h2 className='title'>Личный кабинет</h2>
            <UserProfileInfo section={section}/>
            <Footer />
         </Wrapper>
         <ModalsRenderer />
      </>
   )
};

export default ProfilePage;