import React, { FC } from 'react';
import FavoriteButton from '../FavoriteButton';
import img from '../../../images/webpImages/catalogItems/catalog-item-2.webp';
import './CartStep1.scss';

const CartStep1: FC = () => {
   return (
      <main className="main">
         <div className="main__left">
            <div className="main__top">
               <h2 className="main__title">Корзина</h2>
               <button className="main__button">Очистить</button>
            </div>
            <div className="main__bottom">
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
         <div className="main__right main__panel">
            <form className="main__panel-form">
               <div className="main__panel-row">
                  <p className="main__panel-title">Доставка сегодня, 18:11</p>
                  <button className="main__panel-button">Изменить</button>
               </div>
               <p className="main__panel-info">ул. Новая, д. 13, посёлок Ильинское-Усово, городской округ Красногорск</p>
               <div className="main__panel-input-container">
                  <input type="text" className="main__panel-input" placeholder='Есть промокод?' />
                  <button className="main__panel-input-button">Применить</button>
               </div>
               <div className="main__panel-row main__panel-row--withdraw">
                  <input type="radio" name="withdraw" id="withdraw" value='withdraw' className='main__panel-radio'/>
                  <label htmlFor="withdraw" className="main__panel-radio-label">Списать бонусы (всего 170 бонусов, доступно к списанию 17 бонусов)</label>
               </div>
               <div className="main__panel-total-row">
                  <p className="main__panel-total">Товары (5)</p>
                  <p className="main__panel-total">2.443 кг</p>
               </div>
               <div className="main__panel-total-row">
                  <p className="main__panel-total">Скидки</p>
                  <p className="main__panel-total main__panel-total--red">-104 руб</p>
               </div>
               <div className="main__panel-total-row">
                  <p className="main__panel-total">Бонусы</p>
                  <p className="main__panel-total main__panel-total--red">-17 руб</p>
               </div>
               <div className="main__panel-total-row">
                  <p className="main__panel-total">Промокод</p>
                  <p className="main__panel-total">0 руб</p>
               </div>
               <div className="main__panel-total-row">
                  <p className="main__panel-total">Доставка</p>
                  <p className="main__panel-total">Бесплатно</p>
               </div>
               <div className="main__panel-total-row">
                  <p className="main__panel-total">К оплате</p>
                  <p className="main__panel-total main__panel-total--bold">586 руб</p>
               </div>
               <button className="main__panel-submit" type='submit'>Оформить заказ</button>
               <p className="main__panel-extra">Будет начислено 25 бонусов</p>
            </form>
         </div>
      </main>
   )
};

export default CartStep1;