import React, { FC, useState } from 'react';
import './ContactsPage.scss';
import Header from '../../components/layout/header/Header';
import Wrapper from '../../components/layout/Wrapper';
import Footer from '../../components/layout/Footer';

const ContactsPage: FC = () => {
   const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

   const handleModalChange = (modalState: boolean) => {
    setIsModalOpened(modalState);
   };
   return (
      <Wrapper modalState={isModalOpened}>
         <Header modalState={isModalOpened} onModalChange={handleModalChange}/>
         <div className="contacts">
            <div className="contacts__top">
               <div className="contacts__left">
                  <h2 className="contacts__title">Контакты</h2>
                  <p className="contacts__text">Ильинский онлай - группа компаний...какой-то краткий текст какой-то краткий</p>
                  <p className="contacts__text">ОГР ИНН какие то контакты</p>
               </div>
               <div className="contacts__right">
                  Телефон: 8 800 302-00-60
                  Вопросы, отзывы и предложения: feedback@адрес
               </div>
            </div>
            <div className='contacts-map'>
               <a className='contacts-map__link' href="https://yandex.ru/maps/213/moscow/search/%D0%A1%D1%83%D0%BF%D0%B5%D1%80%D0%BC%D0%B0%D1%80%D0%BA%D0%B5%D1%82%20%D0%9F%D0%B5%D1%80%D0%B5%D0%BA%D1%80%D1%91%D1%81%D1%82%D0%BE%D0%BA/?utm_medium=mapframe&utm_source=maps">Супермаркет Перекрёсток в Москве</a>
               <a className='contacts-map__link' href="https://yandex.ru/maps/213/moscow/?utm_medium=mapframe&utm_source=maps">Москва</a>
               <iframe title='map' className='contacts-map__iframe' src="https://yandex.ru/map-widget/v1/?display-text=%D0%A1%D1%83%D0%BF%D0%B5%D1%80%D0%BC%D0%B0%D1%80%D0%BA%D0%B5%D1%82%20%D0%9F%D0%B5%D1%80%D0%B5%D0%BA%D1%80%D1%91%D1%81%D1%82%D0%BE%D0%BA&ll=37.729843%2C55.801800&mode=search&sctx=ZAAAAAgBEAAaKAoSCRGQL6GC3UJAEWn%2FA6xV50tAEhIJTBdi9UcYvj8RZK2h1F5Eoz8iBgABAgMEBSgKOABAhp8BSAFqAnJ1nQHNzMw9oAEAqAEAvQFaMm8mwgFpzY%2BirskB4Zjpk%2FEDksz5ouIGor%2Fk9W%2FfhY%2FSUraInOHnAbmkssLCBNCO39DXAZWg%2BI2kA47nrLSqAYCcnYX5Aois9%2B%2BDAfyw7seIBMmznpSLAo26qY%2FSA%2B%2F8hqezA4fl0fOwA9bSot0EggIWKChjaGFpbl9pZDooNjAwMjQwNCkpKYoCAJICAJoCDGRlc2t0b3AtbWFwc6oCygE2MDAyNDA0LDEwNjI4OTQ0NTAwNiwzNTQ3MTg2OTMyNyw2MDAzMzc1LDY4OTE5MzMyODA2LDE3MDk0MjA0NTAwOSwzNjA5MDEyMDg2MCw0ODkwNzM4MTc0Miw2MDAyMDg5LDE1OTI1MTAzMTksMTQ3MzcxMzM5MTAxLDYwMDMyNDgsMjkyNDI0NzE2NjgsMjkxNzQzODgzNDIsNjAwMzIwNiw2MDAzNTE1LDE0NDUzMTg1MTU0OCwyMjMwODI5OTQ5MSw2MDAyOTExsAIB&sll=37.729843%2C55.801800&sspn=0.163963%2C0.052493&text=%7B%22text%22%3A%22%D0%A1%D1%83%D0%BF%D0%B5%D1%80%D0%BC%D0%B0%D1%80%D0%BA%D0%B5%D1%82%20%D0%9F%D0%B5%D1%80%D0%B5%D0%BA%D1%80%D1%91%D1%81%D1%82%D0%BE%D0%BA%22%2C%22what%22%3A%5B%7B%22attr_name%22%3A%22chain_id%22%2C%22attr_values%22%3A%5B%226002404%22%5D%7D%5D%7D&z=14.12"></iframe>
            </div>
            <div className="contacts__bottom">
               <h2 className="contacts__title">Магазины ГК "Ильинский"</h2>
               <ul className="contacts__list">
                  <li className="contacts__item">
                     <p className="contacts__item-title">Ильинский Супермаркет</p>
                     <p className="contacts__item-text">Магазин продуктов посёлок Ильинское-Усово, городской округ Красногорск</p>
                     <p className="contacts__item-hours">07:00-00:00</p>
                  </li>
                  <li className="contacts__item">
                     <p className="contacts__item-title">Ильинский Супермаркет</p>
                     <p className="contacts__item-text">Магазин продуктов посёлок Ильинское-Усово, городской округ Красногорск</p>
                     <p className="contacts__item-hours">07:00-00:00</p>
                  </li>
                  <li className="contacts__item">
                     <p className="contacts__item-title">Ильинский Супермаркет</p>
                     <p className="contacts__item-text">Магазин продуктов посёлок Ильинское-Усово, городской округ Красногорск</p>
                     <p className="contacts__item-hours">07:00-00:00</p>
                  </li>
                  <li className="contacts__item">
                     <p className="contacts__item-title">Ильинский Супермаркет</p>
                     <p className="contacts__item-text">Магазин продуктов посёлок Ильинское-Усово, городской округ Красногорск</p>
                     <p className="contacts__item-hours">07:00-00:00</p>
                  </li>
                  <li className="contacts__item">
                     <p className="contacts__item-title">Ильинский Супермаркет</p>
                     <p className="contacts__item-text">Магазин продуктов посёлок Ильинское-Усово, городской округ Красногорск</p>
                     <p className="contacts__item-hours">07:00-00:00</p>
                  </li>
                  <li className="contacts__item">
                     <p className="contacts__item-title">Ильинский Супермаркет</p>
                     <p className="contacts__item-text">Магазин продуктов посёлок Ильинское-Усово, городской округ Красногорск</p>
                     <p className="contacts__item-hours">07:00-00:00</p>
                  </li>
                  <li className="contacts__item">
                     <p className="contacts__item-title">Ильинский Супермаркет</p>
                     <p className="contacts__item-text">Магазин продуктов посёлок Ильинское-Усово, городской округ Красногорск</p>
                     <p className="contacts__item-hours">07:00-00:00</p>
                  </li>
                  <li className="contacts__item">
                     <p className="contacts__item-title">Ильинский Супермаркет</p>
                     <p className="contacts__item-text">Магазин продуктов посёлок Ильинское-Усово, городской округ Красногорск</p>
                     <p className="contacts__item-hours">07:00-00:00</p>
                  </li>
               </ul>
            </div>
         </div>
         <Footer />
      </Wrapper>
   )
};

export default ContactsPage;