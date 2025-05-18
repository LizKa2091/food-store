import React, { FC, useState, useEffect, useContext } from 'react';
import { useMessage } from '../../../context/MessageContext';
import { CartContext } from '../../../context/CartContext';
import { AuthContext } from '../../../context/AuthContext';
import FavoriteButton from '../../UI/FavoriteButton/FavoriteButton';
import ItemQuantityButton from '../../UI/ItemQuantityButton/ItemQuantityButton';
import { fetchUserFavorites } from '../../../services/userService';
import { IFavoriteItem } from '../../../types/cart.types';

const Favorites: FC = () => {
   const [userFavoritesInfo, setUserFavoritesInfo] = useState<IFavoriteItem[]>([]);
   const [isLoading, setIsLoading] = useState<boolean>(false);

   const authContext = useContext(AuthContext);

   const cartContext = useContext(CartContext) || { cartItems: [], addItem: async () => {}, updateItem: async () => {}, removeItem: async () => {}, initCart: async () => {} };
   const { initCart, cartItems } = cartContext;

   const { setMessage } = useMessage();

   useEffect(() => {
      if (authContext?.isAuthed) initCartState();
   }, [authContext]);

   useEffect(() => {
      getUserFavoritesInfo();
   }, []);

   const getUserFavoritesInfo = async () => {
      setIsLoading(true);
      const token = localStorage.getItem('token');

      if (token) {
         let response;

         try {
            response = await fetchUserFavorites(token);
            setUserFavoritesInfo(response.favorites);
            setIsLoading(false);
            setMessage('');
         }
         catch (e) {
            setMessage(response.message);
         }
      }
      else {
         setMessage('Пожалуйста, авторизуйтесь');
      }
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

   return (
      <div className='favorites'>
         {isLoading ? (
            <p className="loader">Загрузка...</p>
         ) : (
            userFavoritesInfo.length > 0 ? (
               <ul className="favorites__list">
                  {userFavoritesInfo.map(item => (
                     <li key={item.productId} className='favorites__item'>
                        {item?.newPrice &&
                           <div className="favorites__item-sale">
                              %
                           </div>
                        }
                        <FavoriteButton productId={item.productId} initialFavState={true}/>
                        <img src={`${item.imagePath}`} alt={item.name} className='favorites__item-img'/>
                        <div className="favorites__item__inner">
                           <p className={"favorites__item-amount" + (item.stockQuantity > 0 ? '' : ' favorites__item-amount--empty')}>
                              {item.stockQuantity > 0 ? (
                                 `В наличии ${item.stockQuantity} шт`
                              ) : (
                                 `Появится завтра`
                              )}
                           </p>
                           <p className="favorites__item-title">{item.name}, {item.weight}</p>
                           <div className="favorites__item-price-cart">
                              <div className={"favorites__item-price" + (item?.newPrice ? 'favorites__item-price--onsale' : '')}>
                                 {item?.newPrice ? (
                                    <>
                                       <p className="favorites__item-new-price">{item.newPrice} руб</p>
                                       <p className="favorites__item-old-price">{item.price} руб</p>
                                    </>
                                 ) : (
                                    <p className="favorites__item-price">{item.price} руб</p>
                                 )}
                              </div>
                              <ItemQuantityButton itemId={item.productId} storageQuantity={item.stockQuantity} currCart={cartItems}/>
                           </div>
                        </div>
                     </li>
                  ))}
               </ul>
            ) : (
               <p className='favorites__warning'>Любимых товаров пока нет</p>
            )
         )}
      </div>
   )
};

export default Favorites;