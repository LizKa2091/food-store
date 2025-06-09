import React, { FC, useState } from 'react';
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
   const { currentModal } = useModal();

   return (
      <>
         <Wrapper>
            {isProfileOpen &&
               <NavProfile isMobile={currentModal === 'mobileAuth'} setIsProfileOpen={setIsProfileOpen} />
            }
            <MobileLowerNav isProfileOpen={isProfileOpen} setIsProfileOpen={setIsProfileOpen} />
            <Header isProfileOpen={isProfileOpen} setIsProfileOpen={setIsProfileOpen} />
            <h2 className='title'>Личный кабинет</h2>
            <UserProfileInfo section={section}/>
            <Footer />
         </Wrapper>
         <ModalsRenderer />
      </>
   )
};

export default ProfilePage;