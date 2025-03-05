import React from 'react';
import './DeliveryBanner.scss';

const DeliveryBanner = () => {
  return (
    <div className='delivery-banner'>
      <div className="delivery-banner__container--text">
        <div className="delivery-banner__col">
          <p className="delivery-banner__title">Бесплатная доставка +</p>
          <p className="delivery-banner__subtitle">первого заказа</p>
        </div>
        <div className="delivery-banner__col">
          <p className="delivery-banner__title">Скидка 10%</p>
          <p className="delivery-banner__subtitle">на заказы кулинарии</p>
        </div>
      </div>
      <button className="delivery-banner__button">Получить промокод</button>
    </div>
  )
};

export default DeliveryBanner;