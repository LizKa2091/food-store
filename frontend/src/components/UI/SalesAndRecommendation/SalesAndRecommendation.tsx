import React, { useState, useEffect, useContext, FC } from "react";
import { useMessage } from "../../../context/MessageContext";
import { CartContext } from "../../../context/CartContext";
import { AuthContext } from "../../../context/AuthContext";
import { fetchUserFavorites } from "../../../services/userService";
import { useModal } from "../../../context/ModalContext";
import ItemCard from "../ItemCard/ItemCard";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import ItemQuantityButton from "../ItemQuantityButton/ItemQuantityButton";
import { IFavoriteItem } from "../../../types/cart.types";
import './SalesAndRecommendation.scss';
import { saleItems } from "../../../data/categories";

type CategoryType = 'Скидки' | 'Рекомендации для вас';

interface ICategoryProps {
   type: CategoryType;
};

const SalesAndRecommendation: FC<ICategoryProps> = ({ type }) => {
   const [userFavorites, setUserFavorites] = useState<string[] | null>(null);
   const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
   const cartContext = useContext(CartContext) || { cartItems: [], addItem: async () => {}, updateItem: async () => {}, removeItem: async () => {}, initCart: async () => {} };
   const { initCart, cartItems } = cartContext;
   
   const authContext = useContext(AuthContext);

   const { setMessage } = useMessage();
   const { openModal, closeModal, currentModal } = useModal();

   useEffect(() => {
      if (authContext?.isAuthed) {
         initCartState();
         getUserFavorites();
      }
   }, [authContext]);

   const getUserFavorites = async (): Promise<void> => {
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
            console.error(e);
            setMessage(response?.message);
         }
      }
   };

   const initCartState = async (): Promise<void> => {
      const token = localStorage.getItem('token');
      try {
         if (!token) throw new Error('ошибка, пользователь не авторизован');

         const result = await initCart(token);
         
         if (result && 'error' in result) {
           console.error(result.error);
           return;
         }
      } 
      catch (e) {
         console.error('ошибка при инициализации корзины:', e);
         setMessage('ошибка при инициализации корзины');
      }
   };

   const handleItemClick = (productId: string): void => {
      setSelectedProductId(productId);
      openModal(`product-${productId}`);
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
                     {Object.entries(saleItems).map(([key, item]) => (
                        <li onClick={() => handleItemClick(item.productId)} key={key} className={item.oldPrice ? "sales-and-recommendation__item item--onsale" : "sales-and-recommendation__item"}>
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
         {currentModal?.startsWith('product-') && selectedProductId && (
            <ItemCard id={selectedProductId} onClose={closeModal} />
         )}
      </>
   );
};

export default SalesAndRecommendation;