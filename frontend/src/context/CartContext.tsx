import React, { useState, FC, ReactNode, createContext } from 'react';
import { addItemToCart, updateItemInCart, removeItemFromCart, getCart } from '../services/cartService';

import bakeryImg1 from '../images/webpImages/catalogItems/catalog-item-1.webp';
import bakeryImg2 from '../images/webpImages/catalogItems/catalog-item-2.webp';
import bakeryImg3 from '../images/webpImages/catalogItems/catalog-item-3.webp';
import bakeryImg4 from '../images/webpImages/catalogItems/catalog-item-4.webp';
import bakeryImg5 from '../images/webpImages/catalogItems/catalog-item-5.webp';
import bakeryImg6 from '../images/webpImages/catalogItems/catalog-item-6.webp';

const images = {
   bakeryImg1,
   bakeryImg2,
   bakeryImg3,
   bakeryImg4,
   bakeryImg5,
   bakeryImg6,
};

interface ICartContext {
   cartItems: CartItem[];
   addItem: (productId: string, quantity: number, token: string) => Promise<void | unknown>;
   updateItem: (productId: string, quantity: number, token: string) => Promise<void | unknown>;
   removeItem: (productId: string, token: string) => Promise<void | unknown>;
   initCart: (token: string) => Promise<void | unknown>;
};

type ImageKeys = keyof typeof images;

type CartItem = {
   productId: string;
   name: string;
   price: number;
   stockQuantity: number;
   weight: string;
   newPrice?: number;
   imagePath: ImageKeys;
   filterCategory: string;
};

const CartContext = createContext<ICartContext | undefined>(undefined);

const CartProvider: FC<{ children: ReactNode }> = ({ children }) => {
   const [cartItems, setCartItems] = useState<CartItem[]>([]);

   const addItem = async (productId: string, quantity: number, token: string) => {
      try {
         let result = await addItemToCart(productId, quantity, token);

         if (result.cart) {
            setCartItems(result.cart);
         }
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

   const initCart = async (token: string) => {
      try {
         let result = await getCart(token);

         if (result.cart) {
            setCartItems(result.cart);
         }
      }
      catch (e) {
         console.error(e);
         return e;
      }
   };
   
   return (
      <CartContext.Provider value={{ cartItems, addItem, updateItem, removeItem, initCart }}>
         {children}
      </CartContext.Provider>
   );
};

export { CartContext, CartProvider };