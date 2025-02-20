import React from "react";
import './Delivery.scss';

const Delivery: React.FC = () => {
    return (
        <section className="delivery">
            <h3 className="delivery__title">Доставка и оплата</h3>
            <div className="delivery__inner">
                <div className="delivery__left">
                    <p className="delivery__subtitle">Зоны доставки</p>
                    <p className="delivery__text">
                        Доставка осуществляется в районе ЖК «Ильинские Луга» (Харьковськая обл., Красногорск, пос. Ильинское-Усово, 
                        ул. Заповедная) и ЖК «Новая Рига» (Харьковськая обл., Красногорск,  д. Глухово, ул. Рублевское Предместье)
                    </p>
                    <p className="delivery__subtitle">25 минут</p>
                    <p className="delivery__text">Доставка 25 минут. Принимаем заказы с 7:00 до 23:00</p>
                    <p className="delivery__subtitle">300 грн</p>
                    <p className="delivery__text">Минимальная сумма бесплатной доставки с учетом скидок. Иначе стоимость доставке 50 грн</p>
                    <p className="delivery__subtitle">Оплата</p>
                    <p className="delivery__text">При оформлении заказа вы можете выбрать удобный для вас спобос рассчета</p>
                    <p className="delivery__text">Изображения продуктов могут отличаться от продуктов в заказе  </p>
                </div>
                <div className="delivery__right">
                    <p className="delivery__subtitle">Карта доставки</p>

                </div>
            </div>
        </section>
    );
};

export default Delivery;