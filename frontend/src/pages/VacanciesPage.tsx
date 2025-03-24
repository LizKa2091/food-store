import React, { FC, useState, useEffect } from 'react';
import './VacanciesPage.scss';
import Wrapper from '../components/layout/Wrapper';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

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

   return (
      <Wrapper>
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
                           <button className="vacancies__item__button">Подробности</button>
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
         </main>
         <Footer />
      </Wrapper>
   )
};

export default VacanciesPage;