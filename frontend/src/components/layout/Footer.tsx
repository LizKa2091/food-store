import React, { FC, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCategory } from "../../context/CategoryContext";
import './Footer.scss';
import visa from '../../images/webpImages/footer/visa.webp';
import mastercard from '../../images/webpImages/footer/mastercard.webp';

const Footer: FC = () => {
   const { setSelectedCategory } = useCategory();

   const handleCategoryClick = (category: string) => {
      setSelectedCategory(category);
   };

   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
   };

   return (
      <footer className="footer">
         <div className="footer__lists">
            <ul className="footer__list footer__list--upper">
               <li className="footer__item footer__list__title">Ильинский онлайн</li>
               <li onClick={() => handleCategoryClick('Кулинария')} className="footer__item">
                  <Link to='/catalog' className="footer__link">Кулинария</Link>
               </li>
               <li onClick={() => handleCategoryClick('Супермаркет')} className="footer__item">
                  <Link to='/catalog' className="footer__link">Супермаркет</Link>
               </li>
               <li onClick={() => handleCategoryClick('Заморозка')} className="footer__item">
                  <Link to='/catalog' className="footer__link">Заморозка</Link>
               </li>
               <li onClick={() => handleCategoryClick('Другое')} className="footer__item">
                  <Link to='/catalog' className="footer__link">Другое</Link>
               </li>
            </ul>
            <ul className="footer__list footer__list--upper">
               <li className="footer__item footer__list__title">Ильинский клуб</li>
               <li className="footer__item">
                  <Link to='/sales' className="footer__link">Акции</Link>
               </li>
               <li className="footer__item">
                  <Link to='' className="footer__link">Доствака и оплата</Link>
               </li>
               <li className="footer__item">
                  <Link to='' className="footer__link">Программа лояльности</Link>
               </li>
               <li className="footer__item">
                  <Link to='' className="footer__link">Конфиденциальность</Link>
               </li>
               <li className="footer__item">
                  <Link to='/vacancies' className="footer__link">Вакансии</Link>
               </li>
            </ul>
            <ul className="footer__list footer__list--upper">
               <li className="footer__item">
                  <a href="tel:+38000490999" className="footer__link footer__item--tel">
                     +38 (000) 49-09-99
                  </a>
               </li>
               <li className="footer__item">
                  Ежедневно c 09:00 до 21:00
               </li>
               <li className="footer__item">
                  <Link to='/contacts' className="footer__link footer__item--address">Адреса магазинов</Link>
               </li>
               <li className="footer__item">
                  <Link to='/contacts' className="footer__link footer__item--inst">Следите за нами</Link>
               </li>
               <li className="footer__item">
                  <Link to='/contacts' className="footer__link footer__item--email">Обратная связь</Link>
               </li>
            </ul>
            <div className="footer__news">
               <p className="footer__news__title">Подпишитесь на вкусные и полезые новости</p>
               <form onSubmit={handleSubmit} className="footer__news__form">
                  <div className="footer__news__form--actions">
                     <input type="email" className="footer__news__input" name='email' id='email' autoComplete="true"/>
                     <button className="footer__news__button">Подписаться</button>
                  </div>
                  <div className="footer__news__form--policy">
                     <input type="radio" name="agree" id="agree" required />
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