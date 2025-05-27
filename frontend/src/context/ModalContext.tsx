import React, { FC, ReactNode, createContext, useState, useContext } from 'react';

interface IModalContextType {
   currentModal: string | null;
   openModal: (modalName: string) => void;
   closeModal: () => void;
};

const ModalContext = createContext<IModalContextType>({
   currentModal: null,
   openModal: () => {},
   closeModal: () => {}
});

export const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
   const [currentModal, setCurrentModal] = useState<string | null>(null);

   const openModal = (modalName: string) => {
      setCurrentModal(modalName);
   };

   const closeModal = () => {
      setCurrentModal(null);
   };

   return (
      <ModalContext.Provider value={{ currentModal, openModal, closeModal }}>
         {children}
      </ModalContext.Provider>
   );
};

export const useModal = () => useContext(ModalContext);