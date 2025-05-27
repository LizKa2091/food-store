import React, { FC } from 'react';
import Wrapper from '../../components/layout/Wrapper';
import Header from '../../components/layout/header/Header';
import UserProfileInfo from '../../components/layout/userProfile/UserProfileInfo';
import Footer from '../../components/layout/Footer';
import './ProfilePage.scss';
import { ModalsRenderer } from '../../components/UI/ModalsRenderer';

interface IProfilePageProps {
   section: string;
};

const ProfilePage: FC<IProfilePageProps> = ({ section }) => {
   return (
      <>
         <Wrapper>
            <Header />
            <h2 className='title'>Личный кабинет</h2>
            <UserProfileInfo section={section}/>
            <Footer />
         </Wrapper>
         <ModalsRenderer />
      </>
   )
};

export default ProfilePage;