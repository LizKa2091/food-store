import bakeryImg1 from '../images/webpImages/catalogItems/catalog-item-1.webp';
import bakeryImg2 from '../images/webpImages/catalogItems/catalog-item-2.webp';
import bakeryImg3 from '../images/webpImages/catalogItems/catalog-item-3.webp';
import bakeryImg4 from '../images/webpImages/catalogItems/catalog-item-4.webp';
import bakeryImg5 from '../images/webpImages/catalogItems/catalog-item-5.webp';
import bakeryImg6 from '../images/webpImages/catalogItems/catalog-item-6.webp';

export interface ICartItem {
   productId: string;
   name: string;
   price: number;
   stockQuantity: number;
   userQuantity: number;
   weight: string;
   newPrice?: number;
   imagePath: ImageKeys;
   filterCategory: string;
};

export type CartValues = {
   cart: ICartItem[];
};

export type ImageKeys = keyof typeof images;

export const images = {
   bakeryImg1,
   bakeryImg2,
   bakeryImg3,
   bakeryImg4,
   bakeryImg5,
   bakeryImg6,
};