import React, { FC, useState, useEffect } from 'react';
import { fetchUserFavorites } from '../../../services/userService';

interface IItems {
    productId: string;
    name: string;
    price: number;
    stockQuantity: number;
    weight: string;
    newPrice?: number;
    imagePath: string;
};

const Favorites: FC = () => {
    const [userFavorites, setUserFavorites] = useState<IItems[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        getUserFavorites();
    }, []);

    const getUserFavorites = async () => {
        setIsLoading(true);
        const token = localStorage.getItem('token');

        if (token) {
            const response = await fetchUserFavorites(token);
            setUserFavorites(response.favorites);
            setIsLoading(false);
        }
        else {
            throw new Error('ошибка, пользователь не авторизован');
        }
    };

    return (
        <div className='favorites'>
            {isLoading ? (
                <p className="loader">Загрузка...</p>
            ) : (
                userFavorites.length > 0 ? (
                    <ul className="favorites__list">
                        {userFavorites.map(item =>
                            <li key={item.productId} className='favorites__item'>
                                {item.name}
                                <img src={`http://localhost:5001/${item.imagePath}`} alt={item.name} className='favorites__item__img'/>
                            </li>
                        )}
                    </ul>
                ) : (
                    <p>Любимых товаров пока нет</p>
                )
            )}
        </div>
    )
};

export default Favorites;