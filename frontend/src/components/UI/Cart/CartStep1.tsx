import React, { FC, ReactNode, useContext, useEffect, useState } from 'react';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import img from '../../../images/webpImages/catalogItems/catalog-item-2.webp';
import './CartStep1.scss';
import CartLate from './CartLate';
import { CartContext } from '../../../context/CartContext';
import { ICartItem, CartValues } from '../../types/cart.types';
import { updateItemInCart } from '../../../services/cartService';

interface ICartStep1Props {
   children: ReactNode;
};

const CartStep1: FC<ICartStep1Props> = ({ children }) => {
   const [currTime, setCurrTime] = useState<string | null>(null);
   const [currCart, setCurrCart] = useState<ICartItem[] | null>(null);
   const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

   const cartContext = useContext(CartContext) || { cartItems: [], addItem: async () => {}, updateItem: async () => {}, removeItem: async () => {}, initCart: async () => {} };

   const { cartItems, addItem, updateItem, removeItem, initCart } = cartContext;

   useEffect(() => {
      const time = getMoscowTime();
      setCurrTime(time);

      initCartState();
   }, []);

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

   const initCartState = async () => {
      try {
         if (!token) throw new Error('ошибка, пользователь не авторизован');

         const result = await initCart(token);
         
         if (result && 'error' in result) {
           console.error(result.error);
           return;
         }
         
         if (result?.cart) {
           setCurrCart(result.cart);
         }
      } 
      catch (error) {
         console.error('ошибка при инициализации корзины:', error);
       }
   };

   const handleIncreaseItem = async (id: string) => {
      if (!token) throw new Error('ошибка, пользователь не авторизован');
      
      await addItem(id, 1, token);
      
      console.log('after:', cartItems)
   };

   const handleDecreaseItem = async (id: string) => {
      if (!token) throw new Error('ошибка, пользователь не авторизован');
      
      await updateItemInCart(id, 1, token);
      
      console.log('after:', cartItems)
   };
   
   const handleRemoveItem = async (id: string) => {
      if (!token) throw new Error('ошибка, пользователь не авторизован');
      
      await removeItem(id, token);
      
      console.log('after:', cartItems)
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
                  {(!currCart || currCart.length === 0) &&
                     <p>В корзине пока пусто. Добавьте товары</p>
                  }
                  {currCart?.map((item: ICartItem) => (
                     <li key={item.name} className="main__item">
                        <div className="main__item-img-container main__item-img-container--sale">
                           <img src={img} alt="item" className="main__item-img" />
                        </div>
                        <div className="main__item-column main__item-column--main">
                           <p className="main__item-title">Пицца мини с ветчиной и сыром, замороженная, 0.44 кг</p>
                           <p className="main__item-quantity">В наличии {item.stockQuantity} шт</p>
                        </div>
                        <div className="main__item-column main__item-column--main">
                           <p className="main__item-price">205 руб</p>
                           <p className="main__item-price-old">257 руб</p>
                        </div>
                        <div className="main__item-quantity-control">
                           <button onClick={() => handleDecreaseItem('1')} className="main__item-quantity-button main__item-quantity-button--minus">-</button>
                              2
                           <button onClick={() => handleIncreaseItem('1')} className="main__item-quantity-button main__item-quantity-button--plus">+</button>
                        </div>
                        <div className="main__item-fav-control">
                           <FavoriteButton productId='500' initialFavState={false} position='relative'/>
                        </div>
                        <div className="main__item-column main__item-column--main">
                           <p className="main__item-total">410 руб</p>
                           <p className="main__item-amount">2 шт</p>
                        </div>
                     </li>
                  ))}
               </ul>
            </div>
         </div>
         {children}
      </main>
   )
};

export default CartStep1;