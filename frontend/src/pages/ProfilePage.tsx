import React, { FC } from 'react';
import Wrapper from '../components/layout/Wrapper';
import Header from '../components/layout/Header';
import UserProfileInfo from '../components/layout/userProfile/UserProfileInfo';
import Footer from '../components/layout/Footer';
import './ProfilePage.scss';

const ProfilePage: FC = () => {
  return (
    <Wrapper>
        <Header />
        <h2 className='title'>Личный кабинет</h2>
        <UserProfileInfo />
        <Footer />
    </Wrapper>
  )
};

export default ProfilePage;