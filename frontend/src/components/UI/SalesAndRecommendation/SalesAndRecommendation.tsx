import React, { useState, useEffect } from "react";
import item1Image from '../../../images/webpImages/products/sale-product-1.webp';
import item2Image from '../../../images/webpImages/products/sale-product-2.webp';
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import { fetchUserFavorites } from "../../../services/userService";
import ItemCard from "../ItemCard/ItemCard";
import { useMessage } from "../../../context/MessageContext";
import './SalesAndRecommendation.scss';

type CategoryType = 'Скидки' | 'Рекомендации для вас';

interface ICategoryProps {
   type: CategoryType;
   onModalChange?: (modalState: boolean) => void;
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

interface Item {
   productId: string;
   image: string;
   amount: number;
   name: string;
   price: number;
   oldPrice?: number;
};

const SalesAndRecommendation = ({ type, onModalChange } : ICategoryProps) => {
   const [userFavorites, setUserFavorites] = useState<string[] | null>(null);
   const [isItemClicked, setIsItemClicked] = useState<boolean>(false);
   const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

   const { setMessage } = useMessage();

   useEffect(() => {
      getUserFavorites();
   }, []);

   const items: Record<string, Item> = {
      item1: { productId: '1', image: item1Image, amount: 2, name: 'Гранола Мюсли Bionova ягодные запечённые хрустящие, 400г', price: 99.90, oldPrice: 129.00},
      item2: { productId: '2', image: item2Image, amount: 33, name: 'Гранола Мюсли Bionova ягодные запечённые хрустящие, 400г', price: 70.90},
      item3: { productId: '3', image: item1Image, amount: 0, name: 'Гранола Мюсли Bionova ягодные запечённые хрустящие, 400г', price: 99.90, oldPrice: 129.00},
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
                           <img src={item.image} className="sales-and-recommendation__item__img" alt={item.name}/>
                           <div className="sales-and-recommendation__item__left">
                              {item.amount !== 0 ?
                                 <p className="sales-and-recommendation__item__amount">В наличии {item.amount}</p>
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
                              <button className="sales-and-recommendation__item__button">{item.amount !== 0 ? "В корзину" : "На завтра"}</button>
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