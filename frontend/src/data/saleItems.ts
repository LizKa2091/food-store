import { IItemShortInfo } from "../types/products.types";
import item1Image from '../images/webpImages/products/sale-product-1.webp';
import item2Image from '../images/webpImages/products/sale-product-2.webp';

export const saleItems: Record<string, IItemShortInfo> = {
   item1: { productId: '1', imagePath: item1Image, stockQuantity: 2, name: 'Гранола Мюсли Bionova ягодные запечённые хрустящие, 400г', price: 99.90, oldPrice: 129.00},
   item2: { productId: '2', imagePath: item2Image, stockQuantity: 33, name: 'Гранола Мюсли Bionova ягодные запечённые хрустящие, 400г', price: 70.90},
   item3: { productId: '3', imagePath: item1Image, stockQuantity: 0, name: 'Гранола Мюсли Bionova ягодные запечённые хрустящие, 400г', price: 99.90, oldPrice: 129.00},
};