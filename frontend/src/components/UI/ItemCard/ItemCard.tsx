import React, { FC, useState, useEffect, useContext } from 'react';
import { useMessage } from '../../../context/MessageContext';
import { getProduct } from '../../../services/productService';
import './ItemCard.scss';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import { fetchUserFavorites } from '../../../services/userService';
import ItemQuantityButton from '../ItemQuantityButton/ItemQuantityButton';
import { CartContext } from '../../../context/CartContext';
import { AuthContext } from '../../../context/AuthContext';

interface IItemCardProps {
   onModalAction: (newState: boolean) => void;
   id: string;
};

interface IItemInfo {
   imagePath: string;
   productId: string;
   category: string;
   name: string;
   weight: string;
   stockQuantity: number;
   price: number;
   newPrice?: number;
   composition: string;
   nutritionValue: string;
   bestBefore: string;
   storageConditions: string;
   package: string;
};

interface FavoriteItem {
   productId: string;
   name: string;
   price: number;
   stockQuantity: number;
   weight: string;
   newPrice?: number;
   imagePath?: string;
};

const ItemCard: FC<IItemCardProps> = ({ onModalAction, id }) => {
   const [product, setProduct] = useState<IItemInfo>({ imagePath: '', productId: '', category: '', name: '', weight: '', stockQuantity: 0, price: 0, composition: '', nutritionValue: '', bestBefore: '', storageConditions: '', package: '' });
   const [userFavorites, setUserFavorites] = useState<string[] | null>(null);

   const { setMessage } = useMessage();

   const authContext = useContext(AuthContext);
   const cartContext = useContext(CartContext) || { cartItems: [], addItem: async () => {}, updateItem: async () => {}, removeItem: async () => {}, initCart: async () => {} };
   const { initCart, cartItems } = cartContext;

   useEffect(() => {
      loadItemInfo(id);
      getUserFavorites();
   }, [])

   useEffect(() => {
      if (authContext?.isAuthed) initCartState();
   }, [authContext]);

   const handleCloseClick = () => {
      onModalAction(false);
   };

   const loadItemInfo = async (itemId: string) => {
      let response;

      try {
         response = await getProduct(itemId);

         if (response.hasOwnProperty('product')) {
            setProduct(response.product);
         }
         else {
            setMessage(response?.message);
         }
      }
      catch (e) {
         setMessage(response.message || 'произошла ошибка при получении сведений о товаре');
      }
   };

   const getUserFavorites = async () => {
      const token = localStorage.getItem('token');

      if (token) {
         let response;
         try {
            response = await fetchUserFavorites(token);

            const favorites = response.favorites.map((item: FavoriteItem) => item.productId);
            setUserFavorites(favorites);
            setMessage('');
         }
         catch(e) {
            setMessage(response?.message);
         }
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
         console.error('ошибка при инициализации корзины:', error);
      }
   };
 
   return (
      <div className='item-modal'>
         <div className="item-modal__inner">
            <div className="item-modal__left">
               <img className='item-modal__img' src={`${product.imagePath}`} alt='item'/>
            </div>
            <div className="item-modal__right">
               <p className="item-modal__category">{product.category}</p>
               <p className="item-modal__title">{product.name}</p>
               <div className="item-modal__row item-modal__row--numbers">
                  <p className="item-modal__weight">{product.weight}</p>
                  <p className="item-modal__amount">{product.stockQuantity > 0 ? `В наличии ${product.stockQuantity} шт` : 'Нет в наличии'}</p>
               </div>
               <div className="item-modal__row item-modal__row--main">
                  <p className="item-modal__price">{product.price} руб</p>
                  <div className="item-modal__row item-modal__row--buttons">
                     <div>
                        <ItemQuantityButton itemId={product.productId} storageQuantity={product.stockQuantity} currCart={cartItems}/>
                     </div>
                     <div className="item-modal__button--fav">
                        <FavoriteButton productId={product.productId} initialFavState={userFavorites ? userFavorites.includes(product.productId) : false} position='relative'/>
                     </div>
                  </div>
               </div>
               <div className="item-modal__extra-container">
                  <p className="item-modal__extra item-modal__extra--composition">
                     Состав: {product.composition}
                  </p>
                  <p className="item-modal__extra item-modal__extra--nutrition-value">
                     Пищевая ценность на 100 г: {product.nutritionValue}
                  </p>
                  <p className="item-modal__extra item-modal__extra--best-before">
                     Срок хранения: {product.bestBefore}
                  </p>
                  <p className="item-modal__extra item-modal__extra--storage-conditions">
                     Условия хранения: {product.storageConditions}
                  </p>
                  <p className="item-modal__extra item-modal__extra--package">
                     Упаковка: {product.package}
                  </p>
               </div>
               <button className="item-modal__button item-modal__button--more">Подробнее</button>
            </div>
            <div className="item-modal__close">
               <button onClick={ handleCloseClick } className="item-modal__button--close">x</button>
            </div>
         </div>
      </div>
   )
};

export default ItemCard;