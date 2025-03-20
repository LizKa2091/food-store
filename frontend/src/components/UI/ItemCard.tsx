import React, { FC } from 'react';
import './ItemCard.scss';
import product from '../../images/webpImages/products/offers-subcategory-2.webp';

interface IItemCardProps {
    onModalAction: (newState: boolean) => void;
};

const ItemCard: FC<IItemCardProps> = ({ onModalAction }) => {
    const handleCloseClick = () => {
        onModalAction(false);
    };
    
    return (
        <div className='item-modal'>
            <div className="item-modal__inner">
                <div className="item-modal__left">
                    <img className='item-modal__img' src={product} alt='item'/>
                </div>
                <div className="item-modal__right">
                    <p className="item-modal__category">Сибирская коллекция</p>
                    <p className="item-modal__title">Блинчики замороженные Сибирская Коллекция с малиной</p>
                    <div className="item-modal__row item-modal__row--numbers">
                        <p className="item-modal__weight">400 г</p>
                        <p className="item-modal__amount">В наличии 4 шт</p>
                    </div>
                    <div className="item-modal__row item-modal__row--main">
                        <p className="item-modal__price">376,00 руб</p>
                        <div className="item-modal__row item-modal__row--buttons">
                            <button className="item-modal__button item-modal__button--cart">В корзину</button>
                            <button className="item-modal__button item-modal__button--like"></button>
                        </div>
                    </div>
                    <div className="item-modal__extra-container">
                        <p className="item-modal__extra item-modal__extra--composition">
                            Состав: Тесто: мука пшеничная высший сорт, вода питьевая, масло сливочное, масло подсолнечное высший сорт, молоко сухое, меланж яичный, сахар, соль, разрыхлитель (гидрокарбонат натрия);начинка: малина свежезамороженная, сахар, ванилин
                        </p>
                        <p className="item-modal__extra item-modal__extra--nutrition-value">
                            Пищевая ценность на 100 г: белки 4.5 г, жиры 6.5 г, углеводы 30.5 г, энергетическая ценность 220 ккал
                        </p>
                        <p className="item-modal__extra item-modal__extra--best-before">
                            Срок хранения: 6 мес
                        </p>
                        <p className="item-modal__extra item-modal__extra--storage-conditions">
                            Условия хранения: При температуре не выше -18°С
                        </p>
                        <p className="item-modal__extra item-modal__extra--package">
                            Упаковка: Картонная коробка
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