import React, { FC, useState, useEffect } from 'react';
import Wrapper from '../components/layout/Wrapper';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SalesAndRecommendation from '../components/UI/SalesAndRecommendation';
import { useCategory } from '../context/CategoryContext';
import { getCatalogProducts } from '../services/productService';
import './CatalogPage.scss';

type CategoryType = 'Супермаркет' | 'Кулинария' | 'Заморозка' | 'Другое';

interface ISubCategory {
   name: string;
   extra?: string;
   filters: string[];
};

const CatalogPage: FC = () => {
   const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
   const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
   const { selectedCategory, setSelectedCategory  } = useCategory();

   const handleCategorySelect = (category: string) => {
      setSelectedCategory(category);
   };

   const handleFilterClick = (filter: string) => {
      setSelectedFilters((prev) => {
         if (prev.includes(filter)) return prev.filter((filterItem) => filterItem !== filter)
         return [...prev, filter];
      })
   };

   const clearFilters = () => {
      setSelectedFilters([]);
   };

   const handleModalChange = (modalState: boolean) => {
      setIsModalOpened(modalState);
   };

   const subCategories: Record<CategoryType, ISubCategory[]> = {
      Супермаркет: [{ name: 'Вода и напитки', filters: ['Вода', 'Напитки'] }, { name: 'Молоко, масло и яйца', filters: ['Молоко', 'Масло', 'Яйца'] }, { name: 'Снэки и сухофрукты', filters: ['Снэки', 'Сухофрукты'] }, { name: 'Кофе, чай и сладости', filters: ['Кофе', 'Чай', 'Сладости'] }, { name: 'Макароны и крупы', filters: ['Макароны', 'Крупы'] }, { name: 'Хлеб и выпечка', filters: ['Хлеб', 'Выпечка', 'Баранки и сухарики', 'Хлебцы', 'Вегетарианцам', 'Безглютеновая продукция', 'Лаваш и лепешки'] }, { name: 'Масло, соусы и специи', filters: ['Масло', 'Соусы', 'Специи'] }, { name: 'Консервы и соленья', filters: ['Консервы', 'Соленья'] }],
      Кулинария: [{ name: 'Выпечка', filters: ['Выпечка'] }, { name: 'Пиццы', filters: ['Пиццы'] }, { name: 'Гриль меню', filters: ['Гриль'] }, { name: 'Свежее мясо', filters: ['Мясо'] }, { name: 'Салаты', filters: ['Салаты'] }, { name: 'Супы', filters: ['Супы'] }, { name: 'Горячие блюда', filters: ['Горячие блюда'] }, { name: 'Десерты', filters: ['Десерты'] }],
      Заморозка: [{ name: 'Пельмени, вареники, равиоли', filters: ['Пельмени', 'Вареники', 'Равиоли'] }, { name: 'Хинкали и манты', filters: ['Хинкали', 'Манты'] }, { name: 'Полу фабрикаты', filters: ['Фабрикаты'] }, { name: 'Замороженные овощи', filters: ['Овощи'] }, { name: 'Рыба и морепродукты', filters: ['Рыба', 'Морепродукты'] }, { name: 'Мясо', filters: ['Мясо'] }],
      Другое: [{ name: 'Красота и гигиена', filters: ['Красота', 'Гигиена'] }, { name: 'Стирка и уборка', filters: ['Стирка', 'Уборка'] }, { name: 'Полезные мелочи', filters: ['Мелочи'] }, { name: 'Бытовая техника', filters: ['Техника'] }],
   };

   return (
      <Wrapper modalState={isModalOpened}>
         <Header />
         <h2 className='catalog-title'>{selectedCategory}</h2>
         <div className="catalog">
            <aside className="catalog-aside">
               <p className="catalog-aside__title">Особенности</p>
               <ul className="catalog-aside__list">
                  <li className="catalog-aside__item catalog-aside__item--radio">
                     <input type="radio" className='catalog-aside__item-radio' name="filter" id="sale" />
                     <label htmlFor="sale" className="catalog-aside__item-label catalog-aside__item-label--radio">Со скидкой</label>
                  </li>
                  <li className="catalog-aside__item catalog-aside__item--radio">
                     <input type="radio" className='catalog-aside__item-radio' name="filter" id="delivery" />
                     <label htmlFor="delivery" className="catalog-aside__item-label catalog-aside__item-label--radio">Доставка сегодня</label>
                  </li>
                  <li className="catalog-aside__item catalog-aside__item--radio">
                     <input type="radio" className='catalog-aside__item-radio' name="filter" id="iljinsky" />
                     <label htmlFor="iljinsky" className="catalog-aside__item-label catalog-aside__item-label--radio">Продукция от "Ильинского"</label>
                  </li>
               </ul>
               <p className="catalog-aside__title">Каталог</p>
               {Object.keys(subCategories).map((category: string) => (
                  <>
                     <p className="catalog-aside__list-title">{category}</p>
                     <ul className="catalog-aside__list catalog-aside__list--categories">
                        {subCategories[category as CategoryType].map((item: ISubCategory) => (
                           <li key={item.name} onClick={() => handleCategorySelect(item.name)} className="catalog-aside__item catalog-aside__item--category">
                              {item.name}
                           </li>
                        ))}
                     </ul>
                  </>
               ))}
            </aside>
            <section className='catalog-section'>
               <div className="catalog-section__filters">
                  <ul className="catalog-section__list catalog-section__list--categories">
                     {Object.keys(subCategories).map((category: string) => (
                        subCategories[category as CategoryType].filter((item: ISubCategory) => item.name === selectedCategory).map((item) => (
                           item.filters.map((filterItem) => (
                              <li key={filterItem} className="catalog-section__item catalog-section__item--category">      
                                 <button onClick={() => handleFilterClick(filterItem)} className={'catalog-section__item-button' + (selectedFilters.includes(filterItem) ? ' catalog-section__item-button--selected' : '')}>{filterItem}</button>
                              </li>
                           ))
                        ))
                     ))}
                     <li key={999} className='catalog-section__item catalog-section__item--clear'>
                        <button onClick={clearFilters} className='catalog-section__item-button--clear'>Очистить фильтры</button>
                     </li>
                  </ul>
               </div>
               <div className="catalog-section__products">
                  <ul className="catalog-section__list catalog-section__list--products">
                     
                  </ul>
               </div>
            </section>
         </div>
         <SalesAndRecommendation onModalChange={handleModalChange} type='Рекомендации для вас' />
         <Footer />
      </Wrapper>
   )
};

export default CatalogPage;