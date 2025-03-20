import React, { FC } from 'react';
import './Promo.scss';
import star from '../../images/webpImages/star.webp';

const Promo: FC = () => {
    return (
        <section className="promo">
            <div className="promo__first">
                <div className="promo__first__plain">
                    <p className="promo__first__title">Начните день с вкусной выпечки из нашей кулинарии</p>
                    <a href="#" className="promo__first__link">Перейти к покупкам</a>
                </div>
                <div className="promo__first__controls">
                    <button className="promo__first__button promo__first__button--arrow-left"></button>
                    <button className="promo__first__button promo__first__button--arrow-right"></button>
                </div>
            </div>
            <div className="promo__second">
                <p className="promo__second__title promo__extra__title">Кэшбэк с каждой покупки</p>
            </div>
            <div className="promo__third">
                <div className="promo__third__rating">
                    <img src={star} alt="звезда" className="promo__third__star" draggable={false} />
                    <img src={star} alt="звезда" className="promo__third__star" draggable={false} />
                    <img src={star} alt="звезда" className="promo__third__star" draggable={false} />
                    <img src={star} alt="звезда" className="promo__third__star" draggable={false} />
                    <img src={star} alt="звезда" className="promo__third__star" draggable={false} />
                </div>
                <p className="promo__third__title promo__extra__title">Оставьте отзыв и получите 5% скидку</p>
            </div>
        </section>
    );
};

export default Promo;