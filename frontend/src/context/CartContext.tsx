import React, { useState, FC, ReactNode, createContext } from 'react';
import { addItemToCart, updateItemInCart, removeItemFromCart, getCart, clearCart } from '../services/cartService';
import { ICartItem } from '../types/cart.types';

interface ICartContext {
   cartItems: ICartItem[];
   addItem: (productId: string, quantity: number, token: string) => Promise<CartResponse>;
   updateItem: (productId: string, quantity: number, token: string) => Promise<CartResponse | unknown>;
   removeItem: (productId: string, token: string) => Promise<CartResponse | unknown>;
   initCart: (token: string) => Promise<CartResponse>;
   handleClearCart: (token: string) => Promise<CartResponse>;
};

type CartResponse = {
   cart?: ICartItem[];
   error?: string;
}; 

const CartContext = createContext<ICartContext | undefined>(undefined);

const CartProvider: FC<{ children: ReactNode }> = ({ children }) => {
   const [cartItems, setCartItems] = useState<ICartItem[]>([]);

   const addItem = async (productId: string, quantity: number, token: string) => {
      try {
         let result = await addItemToCart(productId, quantity, token);

         if (result.cart) {
            setCartItems(result.cart);
         }
         return result;
      }
      catch (e) {
         console.error(e);
         return e;
      }
   };

   const updateItem = async (productId: string, quantity: number, token: string) => {
      try {
         let result = await updateItemInCart(productId, quantity, token);

         if (result.cart) {
            setCartItems(result.cart);
         }
      }
      catch (e) {
         console.error(e);
         return e;
      }
   };

   const removeItem = async (productId: string, token: string) => {
      try {
         let result = await removeItemFromCart(productId, token);

         if (result.cart) {
            setCartItems(result.cart);
         }
      }
      catch (e) {
         console.error(e);
         return e;
      }
   };

   const initCart = async (token: string): Promise<{cart?: ICartItem[], error?: string}> => {
      try {
         let result = await getCart(token);
         if (result && Array.isArray(result.cart)) {
            setCartItems(result.cart);
            return { cart: result.cart };
         }
         return { error: result?.error || 'ошибка инициализации корзины' };
      } 
      catch (error) {
         return { 
            error: error instanceof Error ? error.message : 'Неизвестная ошибка' 
         };
      }
   };

   const handleClearCart = async (token: string): Promise<{cart?: ICartItem[], error?: string}> => {
      try {
         let result = await clearCart(token);
         if (result && Array.isArray(result.cart)) {
            setCartItems(result.cart);
            return { cart: result.cart };
         }
         return { error: result?.error || 'ошибка при очистке корзины' };
      } 
      catch (error) {
         return { 
            error: error instanceof Error ? error.message : 'Неизвестная ошибка' 
         };
      }
   };
   
   return (
      <CartContext.Provider value={{ cartItems, addItem, updateItem, removeItem, initCart, handleClearCart }}>
         {children}
      </CartContext.Provider>
   );
};

export { CartContext, CartProvider };