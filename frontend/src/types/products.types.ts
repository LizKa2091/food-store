export interface ISubCategory {
   name: string;
   extra?: string;
   extended1?: string;
   extended2?: string;
   filters?: string[];
};

export interface IItemShortInfo {
   productId: string;
   imagePath: string;
   stockQuantity: number;
   name: string;
   price: number;
   oldPrice?: number;
   weight?: number;
   newPrice?: number;
   filterCategory?: string;
}

export interface IItemInfo {
   imagePath: string;
   productId: string;
   category: string;
   name: string;
   weight: string;
   stockQuantity: number;
   price: number;
   newPrice?: number;
   composition: string;
   nutritionValue: string;
   bestBefore: string;
   storageConditions: string;
   package: string;
};