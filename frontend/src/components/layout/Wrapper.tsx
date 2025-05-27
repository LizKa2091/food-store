import React, { FC } from 'react';
import { useModal } from '../../context/ModalContext';
import './Wrapper.scss';

interface IWrapperProps {
   children: React.ReactNode;
}

const Wrapper: FC<IWrapperProps> = ({ children }) => {
   const { currentModal } = useModal();

   return (
      <div className={"wrapper" + (currentModal ? " wrapper--darked" : "")}>{children}</div>
   )
};

export default Wrapper;