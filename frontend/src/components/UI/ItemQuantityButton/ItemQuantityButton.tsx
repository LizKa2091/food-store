import React, { FC, useContext, useEffect, useState } from 'react';
import { CartContext } from '../../../context/CartContext';
import { useMessage } from '../../../context/MessageContext';
import { ICartItem } from '../../../types/cart.types';
import './ItemQuantityButton.scss';

interface IItemQuantityButtonProps {
   itemId: string;
   storageQuantity: number;
   currCart: ICartItem[];
};

const ItemQuantityButton: FC<IItemQuantityButtonProps> = ({ itemId, storageQuantity, currCart }) => {
   const [currItem, setCurrItem] = useState<ICartItem | null>(null);

   const cartContext = useContext(CartContext) || { cartItems: [], addItem: async () => {}, updateItem: async () => {}, removeItem: async () => {}, initCart: async () => {} };
   const { addItem, updateItem, removeItem } = cartContext;
   
   const { setMessage } = useMessage();

   useEffect(() => {
      const filteredItem = currCart.find((item: ICartItem) => item.productId === itemId);
      setCurrItem(filteredItem || null);
   }, [itemId, currCart]);

   const handleIncreaseItem = async (id: string): Promise<void> => {
      const token = localStorage.getItem('token');
      if (!token) {
         setMessage('ошибка, пользователь не авторизован');
         return;
      }

      const currentQuantityInCart = currItem?.userQuantity || 0;

      if (storageQuantity === 0) {
         setMessage('Товар будет в наличии только завтра');
         return;
      }

      if (currentQuantityInCart >= storageQuantity) {
         setMessage('Вы не можете добавить товара больше, чем есть на складе');
         return;
      }

      await addItem(id, 1, token);
      setCurrItem(prev => prev ? { ...prev, userQuantity: prev.userQuantity + 1 } : null);
   };

   const handleDecreaseItem = async (id: string): Promise<void> => {
      const token = localStorage.getItem('token');
      if (!token) {
         setMessage('ошибка, пользователь не авторизован');
         return;
      }
      
      if (currItem && currItem.userQuantity > 1) {
         await updateItem(id, currItem.userQuantity - 1, token);
      }
   };
   
   const handleRemoveItem = async (id: string): Promise<void> => {
      const token = localStorage.getItem('token');
      if (!token) {
         setMessage('ошибка, пользователь не авторизован');
         return;
      }   
      
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