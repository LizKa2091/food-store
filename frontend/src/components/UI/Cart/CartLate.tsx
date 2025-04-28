import React, { FC } from 'react';
import './CartLate.scss';

interface ICartLateProps {
   step: number;
};

const CartLate: FC<ICartLateProps> = ({ step }) => {
   if (step === 1) {
      return (
         <div className='late-warning--page1'>
            <p className="late-warning-text">Мы принимаем заказы с 7:00 до 22:00</p>
         </div>
      )
   }
   else if (step === 2) {
      return (
         <div className='late-warning--page2' title='Режим работы: 7:00-00:00'></div>
      )
   }
   return null;
};

export default CartLate;