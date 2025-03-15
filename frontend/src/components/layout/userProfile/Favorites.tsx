import React, { FC, useState, useEffect } from 'react';
import { fetchUserFavorites } from '../../../services/userService';
import FavoriteButton from '../../UI/FavoriteButton';

interface IItems {
    productId: string;
    name: string;
    price: number;
    stockQuantity: number;
    weight: string;
    newPrice?: number;
    imagePath: string;
};

interface FavoriteItem {
    productId: string;
    name: string;
    price: number;
    stockQuantity: number;
    weight: string;
    newPrice?: number;
    imagePath?: string;
};

const Favorites: FC = () => {
    const [userFavoritesInfo, setUserFavoritesInfo] = useState<IItems[]>([]);
    const [userFavorites, setUserFavorites] = useState<string[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        getUserFavoritesInfo();
        getUserFavorites();
    }, []);

    const getUserFavoritesInfo = async () => {
        setIsLoading(true);
        const token = localStorage.getItem('token');

        if (token) {
            const response = await fetchUserFavorites(token);
            setUserFavoritesInfo(response.favorites);
            setIsLoading(false);
        }
        else {
            throw new Error('ошибка, пользователь не авторизован');
        }
    };

    const getUserFavorites = async () => {
        const token = localStorage.getItem('token');

        if (token) {
            let response;

            try {
                response = await fetchUserFavorites(token);

                const favorites = response.favorites.map((item: FavoriteItem) => item.productId);
                setUserFavorites(favorites);
            }
            catch(e) {
                throw new Error(`ошибка: ${e}`);
            }
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
                userFavoritesInfo.length > 0 ? (
                    <ul className="favorites__list">
                        {userFavoritesInfo.map(item => (
                            <li key={item.productId} className='favorites__item'>
                                {item?.newPrice &&
                                    <div className="favorites__item-sale">
                                        %
                                    </div>
                                }
                                <FavoriteButton productId={item.productId} initialFavState={true}/>
                                <img src={`http://localhost:5001/${item.imagePath}`} alt={item.name} className='favorites__item-img'/>
                                <div className="favorites__item__inner">
                                    <p className={"favorites__item-amount" + (item.stockQuantity > 0 ? '' : ' favorites__item-amount--empty')}>
                                        {item.stockQuantity > 0 ? (
                                            `В наличии ${item.stockQuantity} шт`
                                        ) : (
                                            `Появится завтра`
                                        )}
                                    </p>
                                    <p className="favorites__item-title">{item.name}, {item.weight}</p>
                                    <div className="favorites__item-price-cart">
                                        <div className={"favorites__item-price" + (item?.newPrice ? 'favorites__item-price--onsale' : '')}>
                                            {item?.newPrice ? (
                                                <>
                                                    <p className="favorites__item-new-price">{item.newPrice} руб</p>
                                                    <p className="favorites__item-old-price">{item.price} руб</p>
                                                </>
                                            ) : (
                                                <p className="favorites__item-price">{item.price} руб</p>
                                            )}
                                        </div>
                                        <button className="favorites__item-button favorites__item-button--buy">
                                            {item?.newPrice ? (
                                                'В корзину'
                                            ) : (
                                                'На завтра'
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className='favorites__warning'>Любимых товаров пока нет</p>
                )
            )}
        </div>
    )
};

export default Favorites;