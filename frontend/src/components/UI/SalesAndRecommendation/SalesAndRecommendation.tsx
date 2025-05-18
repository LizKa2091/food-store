import React, { useState, useEffect, useContext } from "react";
import { useMessage } from "../../../context/MessageContext";
import { CartContext } from "../../../context/CartContext";
import { AuthContext } from "../../../context/AuthContext";
import { fetchUserFavorites } from "../../../services/userService";
import ItemCard from "../ItemCard/ItemCard";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import ItemQuantityButton from "../ItemQuantityButton/ItemQuantityButton";
import { IFavoriteItem } from "../../../types/cart.types";
import { IItemShortInfo } from "../../../types/products.types";
import item1Image from '../../../images/webpImages/products/sale-product-1.webp';
import item2Image from '../../../images/webpImages/products/sale-product-2.webp';
import './SalesAndRecommendation.scss';

type CategoryType = 'Скидки' | 'Рекомендации для вас';

interface ICategoryProps {
   type: CategoryType;
   modalState: boolean;
   onModalChange?: (modalState: boolean) => void;
};

const SalesAndRecommendation = ({ type, modalState, onModalChange } : ICategoryProps) => {
   const [userFavorites, setUserFavorites] = useState<string[] | null>(null);
   const [isItemClicked, setIsItemClicked] = useState<boolean>(false);
   const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
   const cartContext = useContext(CartContext) || { cartItems: [], addItem: async () => {}, updateItem: async () => {}, removeItem: async () => {}, initCart: async () => {} };
   const { initCart, cartItems } = cartContext;
   
   const authContext = useContext(AuthContext);

   const { setMessage } = useMessage();

   useEffect(() => {
      getUserFavorites();
   }, [modalState]);

   useEffect(() => {
      if (authContext?.isAuthed) initCartState();
   }, [authContext]);

   const items: Record<string, IItemShortInfo> = {
      item1: { productId: '1', imagePath: item1Image, stockQuantity: 2, name: 'Гранола Мюсли Bionova ягодные запечённые хрустящие, 400г', price: 99.90, oldPrice: 129.00},
      item2: { productId: '2', imagePath: item2Image, stockQuantity: 33, name: 'Гранола Мюсли Bionova ягодные запечённые хрустящие, 400г', price: 70.90},
      item3: { productId: '3', imagePath: item1Image, stockQuantity: 0, name: 'Гранола Мюсли Bionova ягодные запечённые хрустящие, 400г', price: 99.90, oldPrice: 129.00},
   };

   const getUserFavorites = async () => {
      const token = localStorage.getItem('token');

      if (token) {
         let response;
         try {
            response = await fetchUserFavorites(token);

            const favorites = response.favorites.map((item: IFavoriteItem) => item.productId);
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

   const handleItemClick = (productId: string) => {
      setSelectedProductId(productId);
      setIsItemClicked(true);
      onModalChange?.(true)
   };  

   const handleItemAction = (newState: boolean) => {
      setIsItemClicked(newState);
      onModalChange?.(false)
   };

   return (
      <>
         <section className="sales-and-recommendation">
               <div className="sales-and-recommendation__top">
                  <p className="sales-and-recommendation__title">{type}</p>
                  <button className="sales-and-recommendation__button">Смотреть все</button>
               </div>
               <div className="sales-and-recommendation__bottom">
                  <ul className="sales-and-recommendation__list">
                     {Object.entries(items).map(([key, item]) => (
                        <li onClick={ () => handleItemClick(item.productId) } key={key} className={item.oldPrice ? "sales-and-recommendation__item item--onsale" : "sales-and-recommendation__item"}>
                           <FavoriteButton productId={item.productId} initialFavState={userFavorites ? userFavorites.includes(item.productId) : false} />
                           <img src={item.imagePath} className="sales-and-recommendation__item__img" alt={item.name}/>
                           <div className="sales-and-recommendation__item__left">
                              {item.stockQuantity !== 0 ?
                                 <p className="sales-and-recommendation__item__amount">В наличии {item.stockQuantity}</p>
                                 : <p className="sales-and-recommendation__item__amount item--outofstock">Появится завтра</p>
                              }
                              <p className="sales-and-recommendation__item__title">{item.name}</p>
                              <p className="sales-and-recommendation__item__price">{item.price} руб</p>
                              {item.oldPrice ?
                                 <p className="sales-and-recommendation__item__price--old">{item.oldPrice} руб</p>
                                 : ''
                              }
                           </div>
                           <div className="sales-and-recommendation__item__right">
                              <ItemQuantityButton itemId={item.productId} storageQuantity={item.stockQuantity} currCart={cartItems}/>
                           </div>
                        </li>
                     ))}
                  </ul>
               </div>
         </section>
         {isItemClicked && selectedProductId &&
            <ItemCard onModalAction={ handleItemAction } id={ selectedProductId }/>
         }
      </>
   );
};

export default SalesAndRecommendation;