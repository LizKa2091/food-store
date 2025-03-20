import React, { FC } from "react";
import './Delivery.scss';

const Delivery: FC = () => {
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
                    <div className='delivery__map-container' style={{position: 'relative', overflow: 'hidden'}}>
                        <a className='delivery__map-link delivery__map-link--1' href="https://yandex.ru/maps/org/park_sokolniki/1607357284/?utm_medium=mapframe&utm_source=maps">Парк Сокольники</a>
                        <a className='delivery__map-link delivery__map-link--2' href="https://yandex.ru/maps/213/moscow/category/park/184106346/?utm_medium=mapframe&utm_source=maps">Парк культуры и отдыха в Москве</a>
                        <a className='delivery__map-link delivery__map-link--3' href="https://yandex.ru/maps/213/moscow/category/amusement_park/184106354/?utm_medium=mapframe&utm_source=maps">Парк аттракционов в Москве</a>
                        <iframe className="delivery__map" src="https://yandex.ru/map-widget/v1/?ll=37.669556%2C55.807501&mode=poi&poi%5Bpoint%5D=37.670636%2C55.804555&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D1607357284&z=13.95"></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Delivery;