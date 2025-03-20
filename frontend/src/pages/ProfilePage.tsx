import React, { FC } from 'react';
import Wrapper from '../components/layout/Wrapper';
import Header from '../components/layout/Header';
import UserProfileInfo from '../components/layout/userProfile/UserProfileInfo';
import Footer from '../components/layout/Footer';
import './ProfilePage.scss';

interface IProfilePageProps {
    section: string;
};

const ProfilePage: FC<IProfilePageProps> = ({ section }) => {
  return (
    <Wrapper modalState={false}>
        <Header />
        <h2 className='title'>Личный кабинет</h2>
        <UserProfileInfo section={section}/>
        <Footer />
    </Wrapper>
  )
};

export default ProfilePage;