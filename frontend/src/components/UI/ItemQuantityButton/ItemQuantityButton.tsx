import React, { FC, useContext, useEffect, useState } from 'react';
import './ItemQuantityButton.scss';
import { ICartItem } from '../../../types/cart.types';
import { CartContext } from '../../../context/CartContext';

interface IItemQuantityButtonProps {
   itemId: string;
   storageQuantity: number;
   currCart: ICartItem[];
};

const ItemQuantityButton: FC<IItemQuantityButtonProps> = ({ itemId, storageQuantity, currCart }) => {
   const [currItem, setCurrItem] = useState<ICartItem | null>(null);

   const cartContext = useContext(CartContext) || { cartItems: [], addItem: async () => {}, updateItem: async () => {}, removeItem: async () => {}, initCart: async () => {} };
   const { addItem, updateItem, removeItem } = cartContext;
   

   useEffect(() => {
      const filteredItem = currCart.find((item: ICartItem) => item.productId === itemId);
      setCurrItem(filteredItem || null);
   }, [itemId, currCart]);

   const handleIncreaseItem = async (id: string) => {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('ошибка, пользователь не авторизован');

      const currentQuantityInCart = currItem?.userQuantity || 0;

      if (storageQuantity === 0) {
         return;
      }

      if (currentQuantityInCart >= storageQuantity) {
         return;
      }

      await addItem(id, 1, token);
      setCurrItem(prev => prev ? { ...prev, userQuantity: prev.userQuantity + 1 } : null);
   };

   const handleDecreaseItem = async (id: string) => {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('ошибка, пользователь не авторизован');
      
      if (currItem && currItem.userQuantity > 1) {
         await updateItem(id, currItem.userQuantity - 1, token);
      }
   };
   
   const handleRemoveItem = async (id: string) => {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('ошибка, пользователь не авторизован');
      
      await removeItem(id, token);
      setCurrItem(null);
   };

   if (!currItem) {
      return (
         <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => { handleIncreaseItem(itemId); e.stopPropagation() }} className='main__item-cart-button'>
            {storageQuantity > 0 ? 'В корзину' : 'На завтра'}
         </button>
      )
   }

   return (
      <div className="main__item-quantity-control" onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
         {currItem.userQuantity === 1 ? (
            <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => { e.stopPropagation(); handleRemoveItem(currItem.productId); }} className="main__item-quantity-button main__item-quantity-button--delete"></button>
         ) : (
            <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => { e.stopPropagation(); handleDecreaseItem(currItem.productId); }} className="main__item-quantity-button main__item-quantity-button--minus">-</button>
         )}
         {currItem.userQuantity}
         <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => { e.stopPropagation(); handleIncreaseItem(currItem.productId) }} className="main__item-quantity-button main__item-quantity-button--plus">+</button>
      </div>
   )
};

export default ItemQuantityButton;