import React, { FC, useState } from 'react';
import Wrapper from '../components/layout/Wrapper';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SalesAndRecommendation from '../components/UI/SalesAndRecommendation';
import './CatalogPage.scss';

const CatalogPage: FC = () => {
    const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

    const handleModalChange = (modalState: boolean) => {
        setIsModalOpened(modalState);
    };

    return (
        <Wrapper modalState={isModalOpened}>
            <Header />
            <SalesAndRecommendation onModalChange={ handleModalChange } type='Рекомендации для вас' />
            <Footer />
        </Wrapper>
    )
};

export default CatalogPage;