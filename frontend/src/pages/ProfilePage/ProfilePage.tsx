import React, { FC, useState } from 'react';
import Wrapper from '../../components/layout/Wrapper';
import Header from '../../components/layout/header/Header';
import UserProfileInfo from '../../components/layout/userProfile/UserProfileInfo';
import Footer from '../../components/layout/Footer';
import './ProfilePage.scss';

interface IProfilePageProps {
    section: string;
};

const ProfilePage: FC<IProfilePageProps> = ({ section }) => {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const handleModalChange = (modalState: boolean) => {
    setIsModalOpened(modalState);
  };

  return (
    <Wrapper modalState={false}>
      <Header modalState={isModalOpened} onModalChange={handleModalChange} />
      <h2 className='title'>Личный кабинет</h2>
      <UserProfileInfo section={section}/>
      <Footer />
    </Wrapper>
  )
};

export default ProfilePage;