import React, { FC, ReactNode, useContext, useEffect, useState } from 'react';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import img from '../../../images/webpImages/catalogItems/catalog-item-2.webp';
import './CartStep1.scss';
import CartLate from './CartLate';
import { CartContext } from '../../../context/CartContext';
import { ICartItem } from '../../../types/cart.types';
import { AuthContext } from '../../../context/AuthContext';
import ItemQuantityButton from '../ItemQuantityButton/ItemQuantityButton';

interface ICartStep1Props {
   children: ReactNode;
};

const CartStep1: FC<ICartStep1Props> = ({ children }) => {
   const [currTime, setCurrTime] = useState<string | null>(null);
   const authContext = useContext(AuthContext);

   const cartContext = useContext(CartContext) || { cartItems: [], initCart: async () => {}, handleClearCart: async () => {} };
   const { initCart, cartItems, handleClearCart } = cartContext;

   useEffect(() => {
      const time = getMoscowTime();
      setCurrTime(time);
   }, []);

   useEffect(() => {
      if (authContext?.isAuthed) initCartState();
   }, [authContext]);

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
      const token = localStorage.getItem('token');
      try {
         if (!token) throw new Error('ошибка, пользователь не авторизован');

         const result = await initCart(token);
         
         if (result && 'error' in result) {
           console.error(result.error);
           return;
         }
      } 
      catch (error) {
         console.error(error);
      }
   };

   const handleButtonClearCart = async () => {
      const token = localStorage.getItem('token');
      try {
         if (!token) throw new Error('ошибка, пользователь не авторизован');

         const result = await handleClearCart(token);

         if (result && 'error' in result) {
            console.error(result.error);
            return;
         }
      }
      catch (error) {
         console.error(error);
      }
   };

   return (
      <main className="main">
         <div className="main__left">
            <div className="main__top">
               <h2 className="main__title">Корзина</h2>
               {authContext?.isAuthed &&
                  <button onClick={handleButtonClearCart} className="main__button">Очистить</button>
               }
            </div>
            <div className="main__bottom">
               {currTime && +currTime?.slice(0, 2) >= 0 && +currTime?.slice(0, 2) < 7 && +currTime?.slice(3) <= 59 &&
                  <CartLate step={1} />
               }
               <ul className="main__list">
                  {!authContext?.isAuthed &&
                     <p>Этот раздел доступен только авторизованным пользователям</p>
                  }
                  {authContext?.isAuthed && (!cartItems || cartItems.length === 0) &&
                     <p>В корзине пока пусто. Добавьте товары</p>
                  }
                  {cartItems?.map((item: ICartItem) => (
                     <li key={item.productId} className="main__item">
                        <div className={"main__item-img-container" + (item.newPrice ? " main__item-img-container--sale" : '') }>
                           <img src={img} alt="item" className="main__item-img" />
                        </div>
                        <div className="main__item-column main__item-column--main">
                           <p className="main__item-title">{item.name}</p>
                           <p className="main__item-quantity">В наличии {item.stockQuantity} шт</p>
                        </div>
                        <div className="main__item-column main__item-column--main">
                           <p className={"main__item-price" + (!item.newPrice ? ' main__item-price--default' : '')}>{item.newPrice ? item.newPrice : item.price} руб</p>
                           {item.newPrice &&
                              <p className="main__item-price-old">{item.price} руб</p>
                           }
                        </div>
                        <ItemQuantityButton itemId={item.productId} storageQuantity={item.stockQuantity} currCart={cartItems} />
                        <div className="main__item-fav-control">
                           <FavoriteButton productId={item.productId} initialFavState={false} position='relative'/>
                        </div>
                        <div className="main__item-column main__item-column--main">
                           <p className="main__item-total">{(item.userQuantity * (item.newPrice || item.price)).toFixed(1)} руб</p>
                           <p className="main__item-amount">{item.userQuantity} шт</p>
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