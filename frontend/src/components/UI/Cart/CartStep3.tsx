import React, { FC } from 'react';
import './CartStep3.scss';

interface ICartStep3Props {
   handleStepChange: (step: number) => void;
};

const CartStep3: FC<ICartStep3Props> = ({ handleStepChange }) => {
   return (
      <div>
         step3
      </div>
   )
};

export default CartStep3;