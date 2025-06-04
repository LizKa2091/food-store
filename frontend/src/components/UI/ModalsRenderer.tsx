import { FC } from 'react';
import { useModal } from '../../context/ModalContext';
import ModalDeliveryMethod from '../layout/header/ModalDeliveryMethod';
import ItemCard from './ItemCard/ItemCard';

export const ModalsRenderer: FC = () => {
   const { currentModal, closeModal } = useModal();

   return (
      <>
         {currentModal === 'delivery' && (
            <ModalDeliveryMethod onClose={closeModal} />
         )}
         {currentModal?.startsWith('product-') && (
            <ItemCard id={currentModal.replace('product-', '')} onClose={closeModal} />
         )}
      </>
   );
};