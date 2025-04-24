import React, { FC, ReactNode } from 'react';
import './CartStep2.scss';

interface ICartStep2Props {
   children: ReactNode;
};

const CartStep2: FC<ICartStep2Props> = ({ children }) => {
   return (
      <div>
         step2
      </div>
   )
};

export default CartStep2;