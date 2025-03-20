import React, { FC } from "react";
import './Footer.scss';
import visa from '../../images/webpImages/footer/visa.webp';
import mastercard from '../../images/webpImages/footer/mastercard.webp';

const Footer: FC = () => {
    return (
        <footer className="footer">
            <div className="footer__lists">
                <ul className="footer__list footer__list--upper">
                    <li className="footer__item footer__list__title">Ильинский онлайн</li>
                    <li className="footer__item">
                        <a href="#" className="footer__link">Кулинария</a>
                    </li>
                    <li className="footer__item">
                        <a href="#" className="footer__link">Супермаркет</a>
                    </li>
                    <li className="footer__item">
                        <a href="#" className="footer__link">Заморозка</a>
                    </li>
                    <li className="footer__item">
                        <a href="#" className="footer__link">Другое</a>
                    </li>
                </ul>
                <ul className="footer__list footer__list--upper">
                    <li className="footer__item footer__list__title">Ильинский клуб</li>
                    <li className="footer__item">
                        <a href="#" className="footer__link">Акции</a>
                    </li>
                    <li className="footer__item">
                        <a href="#" className="footer__link">Доствака и оплата</a>
                    </li>
                    <li className="footer__item">
                        <a href="#" className="footer__link">Программа лояльности</a>
                    </li>
                    <li className="footer__item">
                        <a href="#" className="footer__link">Политика конфиденциальности</a>
                    </li>
                    <li className="footer__item">
                        <a href="#" className="footer__link">Вакансии</a>
                    </li>
                </ul>
                <ul className="footer__list footer__list--upper">
                    <li className="footer__item">
                        <a href="tel:+38000490999" className="footer__link footer__item--tel">+38 (000) 49-09-99</a>
                    </li>
                    <li className="footer__item">
                        <a href="#" className="footer__link footer__item__extra">Ежедневно c 09:00 до 21:00</a>
                    </li>
                    <li className="footer__item">
                        <a href="#" className="footer__link footer__item--address">Адреса магазинов</a>
                    </li>
                    <li className="footer__item">
                        <a href="#" className="footer__link footer__item--inst">Следите за нами</a>
                    </li>
                    <li className="footer__item">
                        <a href="#" className="footer__link footer__item--email">Обратная связь</a>
                    </li>
                </ul>
                <div className="footer__news">
                    <p className="footer__news__title">Подпишитесь на вкусные и полезые новости</p>
                    <form className="footer__news__form" action=''>
                        <div className="footer__news__form--actions">
                            <input type="email" className="footer__news__input" name='email' id='email' autoComplete="true"/>
                            <button className="footer__news__button">Подписаться</button>
                        </div>
                        <div className="footer__news__form--policy">
                            <input type="checkbox" name="agree" id="agree"/>
                            <label htmlFor="agree">Согласен с политикой конфиденциальности</label>
                        </div>
                    </form>
                </div>
            </div>
            <div className="footer__rights">
                <ul className="footer__list footer__list--lower">
                    <li className="footer__item">© 2022 Ильинский онлайн — доставка товаров и продуктов на дом</li>
                    <li className="footer__item">Информация на сайте не является публичной офертой</li>
                    <li className="footer__item footer__item--icons">
                        <img src={visa} alt="VISA" className="footer__item__icon footer__item__icon--visa" />
                        <img src={mastercard} alt="mastercard" className="footer__item__icon footer__item__icon--mastercard" />
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;