import React, { FC, useState } from 'react';
import Wrapper from '../components/layout/Wrapper';
import Header from '../components/layout/header/Header';
import Promo from '../components/layout/Promo';
import SalesAndRecommendation from '../components/UI/SalesAndRecommendation/SalesAndRecommendation';
import Categories from '../components/UI/Categories/Categories';
import Delivery from '../components/layout/Delivery';
import DeliveryBanner from '../components/layout/banners/DeliveryBanner';
import RateBanner from '../components/layout/banners/RateBanner';
import Footer from '../components/layout/Footer';
import { CategoryType } from '../components/UI/Categories/Categories';

const categoriesList: CategoryType[] = ["Супермаркет", "Кулинария", "Заморозка", "Другое", "Акции"];

const MainPage: FC = () => {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const handleModalChange = (modalState: boolean) => {
    setIsModalOpened(modalState);
  };

  return (
    <Wrapper modalState={isModalOpened}>
      <Header modalState={isModalOpened} onModalChange={handleModalChange} />
      <Promo />
      <SalesAndRecommendation modalState={isModalOpened} onModalChange={handleModalChange} type='Скидки'/>
      {categoriesList.map((category) => (
          <Categories key={category} category={category} selectedSubcategory='' setSelectedSubcategory={undefined}/>
      ))}
      <Delivery />
      <DeliveryBanner />
      <RateBanner />
      <Footer />
    </Wrapper>
  )
};

export default MainPage;