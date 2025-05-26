export interface ICartItem {
   productId: string;
   name: string;
   price: number;
   stockQuantity: number;
   userQuantity: number;
   weight: string;
   newPrice?: number;
   imagePath: string;
   filterCategory: string;
};

export interface IFavoriteItem {
   productId: string;
   name: string;
   price: number;
   stockQuantity: number;
   weight: string;
   newPrice?: number;
   imagePath?: string;
};

export interface IDeliveryData {
   address: string;
   deliveryDate: string;
   deliveryTime: 'for 25 mins' | 'for 2 hours';
};