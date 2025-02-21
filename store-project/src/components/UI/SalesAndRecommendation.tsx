import React from "react";
import item1Image from '../../images/products/sale-product-1.png';
import item2Image from '../../images/products/sale-product-2.png';
import './SalesAndRecommendation.scss';

type CategoryType = 'Скидки' | 'Рекомендации для вас';

interface CategoryProps {
    type: CategoryType;
}

interface Item {
    image: string;
    amount: number;
    name: string;
    price: number;
    oldPrice?: number;
};

const SalesAndRecommendation = ({ type } : CategoryProps) => {
    const items: Record<string, Item> = {
        item1: {image: item1Image, amount: 2, name: 'Гранола Мюсли Bionova ягодные запечённые хрустящие, 400г', price: 99.90, oldPrice: 129.00},
        item2: {image: item2Image, amount: 33, name: 'Гранола Мюсли Bionova ягодные запечённые хрустящие, 400г', price: 70.90},
        item3: {image: item1Image, amount: 0, name: 'Гранола Мюсли Bionova ягодные запечённые хрустящие, 400г', price: 99.90, oldPrice: 129.00},
        item4: {image: item2Image, amount: 3, name: 'Гранола Мюсли Bionova ягодные запечённые хрустящие, 400г', price: 99.90},
    }

    return (
        <section className="sales-and-recommendation">
            <div className="sales-and-recommendation__top">
                <p className="sales-and-recommendation__title">{type}</p>
                <button className="sales-and-recommendation__button">Смотреть все</button>
            </div>
            <div className="sales-and-recommendation__bottom">
                <ul className="sales-and-recommendation__list">
                    {Object.entries(items).map(([key, item]) => (
                        <li key={key} className={item.oldPrice ? "sales-and-recommendation__item item--onsale" : "sales-and-recommendation__item"}>
                            <img src={item.image} className="sales-and-recommendation__item__img" />
                            <div className="sales-and-recommendation__item__left">
                                {item.amount !== 0 ?
                                    <p className="sales-and-recommendation__item__amount">В наличии {item.amount}</p>
                                    : <p className="sales-and-recommendation__item__amount item--outofstock">Появится завтра</p>
                                }
                                <p className="sales-and-recommendation__item__title">{item.name}</p>
                                <p className="sales-and-recommendation__item__price">{item.price} руб</p>
                                {item.oldPrice ?
                                    <p className="sales-and-recommendation__item__price--old">{item.oldPrice} руб</p>
                                    : ''
                                }
                            </div>
                            <div className="sales-and-recommendation__item__right">
                                <button className="sales-and-recommendation__item__button">{item.amount !== 0 ? "В корзину" : "На завтра"}</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default SalesAndRecommendation;