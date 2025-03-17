import React, { FC, useState } from 'react';
import { useMessage } from '../../context/MessageContext';
import './Notifications.scss';

const Notifications: FC = () => {
    const [isNotifActive, setIsNotifActive] = useState<boolean>(true);
    const [isFading, setIsFading] = useState<boolean>(false);

    const { message } = useMessage();

    const handleClick = () => {
        setIsFading(true);

        setTimeout(() => {
            setIsNotifActive(false);
        }, 700);
    };

    return (
        <>
            {isNotifActive ? (
                <div className={'notifications' + (isFading ? ' hidden' : '')}>
                    <p className="notifications__text">{message}</p>
                    <button onClick={ handleClick } className="notifications__button">x</button>
                </div>
                ) : null
            }
        </>
    )
};

export default Notifications;