import React, { FC, useState, useEffect, useContext } from 'react';
import { addToFavorites, removeFromFavorites } from '../../services/productService';
import { useMessage } from '../../context/MessageContext';
import { AuthContext } from '../../context/AuthContext';
import './FavoriteButton.scss';

interface IFavoriteButtonProps {
    productId: string;
    initialFavState: boolean;
};

const FavoriteButton: FC<IFavoriteButtonProps> = ({ productId, initialFavState }) => {
    const [isFavorited, setIsFavorited] = useState<boolean>(initialFavState);
    const { isAuthed } = useContext(AuthContext) || { isAuthed: false };

    const { setMessage } = useMessage();

    useEffect(() => {
        setIsFavorited(initialFavState);
    }, [initialFavState]);

    useEffect(() => {
      if (!isAuthed) {
         setIsFavorited(false);
      }
    }, [isAuthed]);

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

                if (response.hasOwnProperty('favorites')) {
                    setIsFavorited(prevVal => !prevVal);
                }
                else if (response.hasOwnProperty('warning')) {
                  setMessage(response.warning);
                }
                else {
                  setMessage(response.message);
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