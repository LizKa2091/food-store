import React, { FC } from 'react';
import './Wrapper.scss';

interface IWrapperProps {
    children: React.ReactNode;
    modalState?: boolean;
}

const Wrapper: FC<IWrapperProps> = ({ children, modalState }) => {
    return (
        <div className={"wrapper" + (modalState ? " wrapper--darked" : "")}>{children}</div>
    )
};

export default Wrapper;