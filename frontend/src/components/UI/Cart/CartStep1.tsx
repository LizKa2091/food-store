import React, { FC, ReactNode, useEffect, useState } from 'react';
import FavoriteButton from '../FavoriteButton';
import img from '../../../images/webpImages/catalogItems/catalog-item-2.webp';
import './CartStep1.scss';
import CartLate from './CartLate';

interface ICartStep1Props {
   children: ReactNode;
};

const CartStep1: FC<ICartStep1Props> = ({ children }) => {
   const [currTime, setCurrTime] = useState<string | null>(null);

   useEffect(() => {
      //setCurrTime(getMoscowTime);
      setCurrTime('05:59')
   }, [currTime]);

   const getMoscowTime = () => {
      const options: Intl.DateTimeFormatOptions = {
         timeZone: 'Europe/Moscow',
         hour: '2-digit',
         minute: '2-digit',
         hour12: false
      };
      const moscowTime = new Intl.DateTimeFormat('ru-RU', options).format(new Date());
      return moscowTime;
   };

   return (
      <main className="main">
         <div className="main__left">
            <div className="main__top">
               <h2 className="main__title">Корзина</h2>
               <button className="main__button">Очистить</button>
            </div>
            <div className="main__bottom">
               {currTime && +currTime?.slice(0, 2) >= 0 && +currTime?.slice(0, 2) < 7 && +currTime?.slice(3) <= 59 &&
                  <CartLate step={1} />
               }
               <ul className="main__list">
                  <li className="main__item">
                     <div className="main__item-img-container main__item-img-container--sale">
                        <img src={img} alt="item" className="main__item-img" />
                     </div>
                     <div className="main__item-column main__item-column--main">
                        <p className="main__item-title">Пицца мини с ветчиной и сыром, замороженная, 0.44 кг</p>
                        <p className="main__item-quantity">В наличии 2 шт</p>
                     </div>
                     <div className="main__item-column main__item-column--main">
                        <p className="main__item-price">205 руб</p>
                        <p className="main__item-price-old">257 руб</p>
                     </div>
                     <div className="main__item-quantity-control">
                        <button className="main__item-quantity-button main__item-quantity-button--minus">-</button>
                           2
                        <button className="main__item-quantity-button main__item-quantity-button--plus">+</button>
                     </div>
                     <div className="main__item-fav-control">
                        <FavoriteButton productId='500' initialFavState={false} position='relative'/>
                     </div>
                     <div className="main__item-column main__item-column--main">
                        <p className="main__item-total">410 руб</p>
                        <p className="main__item-amount">2 шт</p>
                     </div>
                  </li>
                  
               </ul>
            </div>
         </div>
         {children}
      </main>
   )
};

export default CartStep1;