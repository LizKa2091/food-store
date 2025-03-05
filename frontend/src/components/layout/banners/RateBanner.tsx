import React from 'react';
import './RateBanner.scss';
import star from '../../../images/star.png';
import emptyStar from '../../../images/empty-star.png';

const RateBanner = () => {
  return (
    <div className='rate-banner'>
      <div className="rate-banner__col">
        <p className="rate-banner__title">Оцените магазин</p>
        <p className="rate-banner__subtitle">Поделитесь впечатлениями о заказе и помогите сделать нас лучше</p>
      </div>
      <div className="rate-banner__col rate-banner__col--stars">
        <div className="rate-banner__container--stars">
            <img src={star} className='star' alt="star" />
            <img src={star} className='star' alt="star" />
            <img src={star} className='star' alt="star" />
            <img src={star} className='star' alt="star" />
            <img src={emptyStar} className='star' alt="empty star" />
        </div>
        <button className="rate-banner__button">Оставить отзыв</button>
      </div>
  </div>
  )
};

export default RateBanner;