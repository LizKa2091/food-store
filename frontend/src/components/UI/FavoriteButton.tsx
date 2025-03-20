import React, { FC, useState, useEffect } from 'react';
import { addToFavorites, removeFromFavorites } from '../../services/productService';
import { useMessage } from '../../context/MessageContext';
import './FavoriteButton.scss';

interface FavoriteButtonProps {
    productId: string;
    initialFavState: boolean;
};

const FavoriteButton: FC<FavoriteButtonProps> = ({ productId, initialFavState }) => {
    const [isFavorited, setIsFavorited] = useState<boolean>(initialFavState);

    const { setMessage } = useMessage();

    useEffect(() => {
        setIsFavorited(initialFavState);
    }, [initialFavState]);

    const handleClick = async (): Promise<void> => {
        const token = localStorage.getItem('token');

        if (token) {
            let response;
            try {   
                if (isFavorited) {
                    response = await removeFromFavorites(token, productId);
                }
                else {
                    response = await addToFavorites(token, productId);
                }

                if (response) {
                    setIsFavorited(prevVal => !prevVal);
                }
            }
            catch (e) {
               setMessage(response.message);
            }
        }
        else {
         setMessage('Пожалуйста, авторизуйтесь');
        }
    };

    return (
        <>
            <button 
                className={'favorite-button' + (isFavorited ? ' favorite-button--favorited' : '')} 
                onClick={ handleClick }
            >
            </button>
        </>
    )
};

export default FavoriteButton;