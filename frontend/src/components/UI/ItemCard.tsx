import React, { FC } from 'react';
import './ItemCard.scss';

const ItemCard: FC = () => {
    return (
        <div className='item-modal'>
            <div className="item-modal__inner">
                <div className="item-modal__left">
                    <img className='item-modal__img'/>
                </div>
                <div className="item-modal__right">
                    <p className="item-modal__category"></p>
                    <p className="item-modal__title"></p>
                    <div className="item-modal__row item-modal__row--numbers">
                        <p className="item-modal__weight"></p>
                        <p className="item-modal__amount"></p>
                    </div>
                    <div className="item-modal__row item-modal__row--main">
                        <p className="item-modal__price"></p>
                        <div className="item-modal__row item-modal__row--buttons">
                            <button className="item-modal__button item-modal__button--cart"></button>
                            <button className="item-modal__button item-modal__button--like"></button>
                        </div>
                    </div>
                    <p className="item-modal__composition"></p>
                    <p className="item-modal__nutrition-value"></p>
                    <p className="item-modal__best-before"></p>
                    <p className="item-modal__storage-conditions"></p>
                    <p className="item-modal__package"></p>
                    <button className="item-modal__button item-modal__button--more"></button>
                </div>
            </div>
        </div>
    )
};

export default ItemCard;