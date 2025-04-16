import React, { createContext, useContext, useState, ReactNode, FC } from 'react';

interface CategoryContextType {
   selectedCategory: string | undefined;
   setSelectedCategory: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider: FC<{ children: ReactNode }> = ({ children }) => {
   const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
   return (
      <CategoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
         {children}
      </CategoryContext.Provider>
   );
};
export const useCategory = () => {
   const context = useContext(CategoryContext);
   if (context === undefined) {
      throw new Error('useCategory must be used within a CategoryProvider');
   }
   return context;
};