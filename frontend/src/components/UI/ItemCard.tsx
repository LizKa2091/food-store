import React, { FC, useState, useEffect } from 'react';
import { useMessage } from '../../context/MessageContext';
import { getProduct } from '../../services/productService';
import './ItemCard.scss';

interface IItemCardProps {
    onModalAction: (newState: boolean) => void;
    id: string;
};

interface IItemInfo {
    imagePath: string;
    productId: string;
    category: string;
    name: string;
    weight: string;
    stockQuantity: number;
    price: number;
    newPrice?: number;
    composition: string;
    nutritionValue: string;
    bestBefore: string;
    storageConditions: string;
    package: string;
};

const ItemCard: FC<IItemCardProps> = ({ onModalAction, id }) => {
    const [product, setProduct] = useState<IItemInfo>({ imagePath: '', productId: '', category: '', name: '', weight: '', stockQuantity: 0, price: 0, composition: '', nutritionValue: '', bestBefore: '', storageConditions: '', package: '' });

    const { setMessage } = useMessage();

    useEffect(() => {
       loadItemInfo(id);
    }, [])

    const handleCloseClick = () => {
        onModalAction(false);
    };

    const loadItemInfo = async (itemId: string) => {
      let response;

      try {
         response = await getProduct(itemId);

         if (response.hasOwnProperty('product')) {
             setProduct(response.product);
         }
         else {
             setMessage(response?.message);
         }
      }
      catch (e) {
         setMessage(response.message || 'произошла ошибка при получении сведений о товаре');
      }
    };

    
    return (
        <div className='item-modal'>
            <div className="item-modal__inner">
                <div className="item-modal__left">
                    <img className='item-modal__img' src={`${product.imagePath}`} alt='item'/>
                </div>
                <div className="item-modal__right">
                    <p className="item-modal__category">{product.category}</p>
                    <p className="item-modal__title">{product.name}</p>
                    <div className="item-modal__row item-modal__row--numbers">
                        <p className="item-modal__weight">{product.weight}</p>
                        <p className="item-modal__amount">{product.stockQuantity > 0 ? `В наличии ${product.stockQuantity} шт` : 'Нет в наличии'}</p>
                    </div>
                    <div className="item-modal__row item-modal__row--main">
                        <p className="item-modal__price">{product.price} руб</p>
                        <div className="item-modal__row item-modal__row--buttons">
                            <button className={"item-modal__button item-modal__button--cart" + (product.stockQuantity === 0 ? 'item-modal__button item-modal__button--cart--empty' : '')}>
                              {product.stockQuantity > 0 ? 'В корзину' : 'На завтра'}
                            </button>
                            <button className="item-modal__button item-modal__button--like"></button>
                        </div>
                    </div>
                    <div className="item-modal__extra-container">
                        <p className="item-modal__extra item-modal__extra--composition">
                            Состав: {product.composition}
                        </p>
                        <p className="item-modal__extra item-modal__extra--nutrition-value">
                            Пищевая ценность на 100 г: {product.nutritionValue}
                        </p>
                        <p className="item-modal__extra item-modal__extra--best-before">
                            Срок хранения: {product.bestBefore}
                        </p>
                        <p className="item-modal__extra item-modal__extra--storage-conditions">
                            Условия хранения: {product.storageConditions}
                        </p>
                        <p className="item-modal__extra item-modal__extra--package">
                            Упаковка: {product.package}
                        </p>
                    </div>
                    <button className="item-modal__button item-modal__button--more">Подробнее</button>
                </div>
                <div className="item-modal__close">
                    <button onClick={ handleCloseClick } className="item-modal__button--close">x</button>
                </div>
            </div>
        </div>
    )
};

export default ItemCard;