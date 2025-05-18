import React, { FC, useState, useEffect } from 'react';
import Wrapper from '../../components/layout/Wrapper';
import Header from '../../components/layout/header/Header';
import Footer from '../../components/layout/Footer';
import './VacanciesPage.scss';

interface IItem {
   id: number;
   title: string;
   subtite: string;
   salary: string;
   imagePath: string;
};

interface IFormData {
   fio: string;
   tel: string;
   date: string;
   country: string;
};

const VacanciesPage: FC = () => {
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [items, setItems] = useState<IItem[] | null>(null);
   const [selectedItem, setSelectedItem] = useState<IItem | null>(null);
   const [formData, setFormData] = useState<IFormData>({fio: '', tel: '', date: '', country: ''});
   const [error, setError] = useState<string>('');

   useEffect(() => {
      const fetchItems = async () => {
         setIsLoading(true);
         let response;
         try {
            response = await fetch('http://localhost:5001/vacancies', {
               method:  'GET',
               headers: {
                  'Content-Type': 'application/json',
               }
            });
            let result = await response.json();
            setItems(result.vacancies);
         }
         catch (e) {
            console.error(e);
            setError('не удалось загрузить вакансии');
         }
         finally {
            setIsLoading(false);
         }
      };
      fetchItems();
   }, []);

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
   };

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
   };

   const handleItemClick = (e: number) => {
      const filteredItems = items?.filter(item => item.id === e);

      if (filteredItems) setSelectedItem(filteredItems[0]);
   };

   const handleCloseModal = () => {
      if (selectedItem) setSelectedItem(null);
   };

   return (
      <Wrapper modalState={Boolean(selectedItem)}>
         <Header />
         <main className='vacancies'>
            <h2 className="vacancies__title">Вакансии</h2>
            <div className="vacancies__inner">
               {isLoading && <p className='loader'>Загрузка...</p>}
               {error && <p className='error'>{error}</p>}
               {!isLoading && items &&
                  <ul className='vacancies__list'>
                     {items.map(item => (
                        <li key={item.id} className={`vacancies__item vacancies__item--${item.id}`}>
                           <p className="vacancies__item__title">{item.title}</p>
                           <p className="vacancies__item__subtitle">{item.subtite}</p>
                           <p className="vacancies__item__salary">{item.salary}</p>
                           <button className="vacancies__item__button" onClick={ () => handleItemClick(item.id) }>Подробности</button>
                        </li>
                     ))}
                  </ul>
               }
            </div>
            <aside className='aside'>
               <div className="aside__left">
                  <p className="aside__title">Хотите стать частью нашей команды?</p>
                  <p className="aside__subtitle">Оставьте заявку и мы с вами свяжемся</p>
               </div>
               <div className="aside__right">
                  <form onSubmit={ handleSubmit } className="aside__form">
                     <div className="aside__form__inputs">
                        <input 
                           value={ formData.fio } onChange={ handleInputChange }
                           type="text" name="fio" id="fio" className='aside__form__input' placeholder='ФИО' required 
                        />
                        <input 
                           value={ formData.tel } onChange={ handleInputChange }
                           type="tel" name="tel" id="tel" className='aside__form__input' placeholder='Телефон' required 
                        />
                        <input 
                           value={ formData.date } onChange={ handleInputChange }
                           type="date" name="date" id="date" className='aside__form__input' placeholder='Дата рождения' required 
                        />
                        <input 
                           value={ formData.country } onChange={ handleInputChange }
                           type="text" name="country" id="country" className='aside__form__input' placeholder='Страна' required 
                        />
                     </div>
                     <div className="aside__form__row">
                        <div className="aside__form__agreement-container">
                           <input type="checkbox" name="agreement" id="agremeent" className='aside__form__checkbox' required />
                           <label htmlFor="agreement" className='aside__form__label'>согласие на обработку персональных данных</label>
                        </div>
                        <button type="submit" className='aside__form__button'>Отправить</button>
                     </div>
                  </form>
               </div>
            </aside>
            {selectedItem &&
               <div className="modal">
                  <div className="modal__inner">
                     <div className={`modal__icon-container modal__icon-container--${selectedItem.id}`}>
                     </div>
                     <div className="modal__main">
                        <p className="modal__title">{selectedItem.title}</p>
                        <p className="modal__extra">Стабильный доход <br />{selectedItem.salary}</p>
                        <p className="modal__title">Чем предстоит заниматься?</p>
                        <ul className="modal__list">
                           <li className="modal__item">Консультировать и помогать покупателям</li>
                           <li className="modal__item">Работать с кассой</li>
                           <li className="modal__item">Оформлять витрины в прикассовой зоне</li>
                           <li className="modal__item">Поддерживать чистоту в прикассовой зоне</li>
                        </ul>
                        <p className="modal__title">Вашим преимуществом будет</p>
                        <ul className="modal__list">
                           <li className="modal__item">Умение работать с людьми</li>
                           <li className="modal__item">Грамотная речь</li>
                        </ul>
                        <p className="modal__title">Мы гарантируем</p>
                        <ul className="modal__list">
                           <li className="modal__item">Оформление по ТК России</li>
                           <li className="modal__item">Компенсация питания</li>
                           <li className="modal__item">Фирменная спецодежда</li>
                        </ul>
                     </div>
                     <form onSubmit={ handleSubmit } className="modal__form">
                        <div className="modal__form__inputs">
                           <input 
                              value={ formData.fio } onChange={ handleInputChange }
                              type="text" name="fio" id="fio" className='modal__form__input' placeholder='ФИО' required 
                           />
                           <input 
                              value={ formData.tel } onChange={ handleInputChange }
                              type="tel" name="tel" id="tel" className='modal__form__input' placeholder='Телефон' required 
                           />
                           <input 
                              value={ formData.date } onChange={ handleInputChange }
                              type="date" name="date" id="date" className='modal__form__input' placeholder='Дата рождения' required 
                           />
                           <input 
                              value={ formData.country } onChange={ handleInputChange }
                              type="text" name="country" id="country" className='modal__form__input' placeholder='Страна' required 
                           />
                        </div>
                        <div className="modal__form__extra">
                           <div className="modal__form__agreement-container">
                              <input type="checkbox" name="agreement" id="agremeent" className='modal__form__checkbox' required />
                              <label htmlFor="agreement" className='modal__form__label'>согласие на обработку персональных данных</label>
                           </div>
                           <button type="submit" className='modal__form__button'>Откликнуться</button>
                        </div>
                     </form>
                  </div>
                  <button onClick={ handleCloseModal } className="modal__button--close">x</button>
               </div>
            }
         </main>
         <Footer />
      </Wrapper>
   )
};

export default VacanciesPage;