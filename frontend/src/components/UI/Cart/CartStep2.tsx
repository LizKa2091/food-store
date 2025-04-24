import React, { FC } from 'react';
import './CartStep2.scss';

interface ICartStep2Props {
   handleStepChange: (step: number) => void;
};

const CartStep2: FC<ICartStep2Props> = ({ handleStepChange }) => {
   return (
      <div>
         step2
      </div>
   )
};

export default CartStep2;