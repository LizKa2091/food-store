import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCategory } from '../../../context/CategoryContext';
import { ISubCategory } from '../../../types/products.types';
import './Categories.scss';

export type CategoryType = 'Супермаркет' | 'Кулинария' | 'Заморозка' | 'Другое' | 'Акции';

interface ICategoriesProps {
   category: CategoryType;
   type?: 'extended';
   selectedSubcategory?: string;
}

const Categories: FC<ICategoriesProps> = ({ category, type }) => {
   const navigate = useNavigate();
   const { setSelectedCategory } = useCategory();
   
   const subCategories: Record<CategoryType, ISubCategory[]> = {
      Супермаркет: [{ name: 'Вода и напитки' }, { name: 'Молоко, масло и яйца' }, { name: 'Снэки и сухофрукты' }, { name: 'Кофе, чай и сладости' }, { name: 'Макароны и крупы' }, { name: 'Хлеб и выпечка' }, { name: 'Масло, соусы и специи' }, { name: 'Консервы и соленья' }],
      Кулинария: [{ name: 'Выпечка' }, { name: 'Пиццы' }, { name: 'Гриль меню' }, { name: 'Свежее мясо' }, { name: 'Салаты' }, { name: 'Супы' }, { name: 'Горячие блюда' }, { name: 'Десерты' }],
      Заморозка: [{ name: 'Пельмени, вареники, равиоли' }, { name: 'Хинкали и манты' }, { name: 'Полу фабрикаты' }, { name: 'Замороженные овощи' }, { name: 'Рыба и морепродукты' }, { name: 'Мясо' }],
      Другое: [{ name: 'Красота и гигиена' }, { name: 'Стирка и уборка' }, { name: 'Полезные мелочи' }, { name: 'Бытовая техника' }],
      Акции: [{ name: 'Сделай предзаказ в кулинарии со скидкой', extended1: 'Оформите заказ на кулинарию за сутки и получите скидку', extended2: 'Заказ будет доставлен вовремя' }, { name: 'Праздник к нам приходит', extra: '15% скидка', extended1: 'Оформите заказ на кулинарию за сутки и получите скидку', extended2: 'Заказ будет доставлен вовремя' }, { name: 'Скидка на третий товар в разделе "Чистая линия"', extended1: 'Оформите заказ на кулинарию за сутки и получите скидку', extended2: 'Заказ будет доставлен вовремя' }, { name: 'Комбо набор 3 пиццы за 1500', extra: 'trio1500', extended1: 'Оформите заказ на кулинарию за сутки и получите скидку', extended2: 'Заказ будет доставлен вовремя' }]
   };

   const handleLiClick = (name: string): void => {
      setSelectedCategory(name); 

      navigate('/catalog')
   };

   return (
      <section className={'category-section' + (type === 'extended' ? ' extended' : '')}>
         <div className="category__info">
            <h4 className='category__title'>{category}</h4>
            <button className="category__button">Смотреть все</button>
         </div>
            <ul className={`category__list ${category}`}>
            {subCategories[category].map(el => 
               type === 'extended' ? (
                  <li className={`subcategory__item ${category} extended ${el.name.split(' ').length === 1 ? el.name : el.name.split(' ')[0].replace(',', '')}`} key={el.name}>
                     <div className={`subcategory__item__left ${category} ${el.name.split(' ').length === 1 ? el.name : el.name.split(' ')[0].replace(',', '')}`}>
                        <p className={`subcategory__title ${category} extended`}>{el.name}</p>
                        {el.extra &&
                           <span className='subcategory__extra'>{el.extra}</span>
                        }
                     </div>
                     <div className={`subcategory__item__right ${category} ${el.name.split(' ').length === 1 ? el.name : el.name.split(' ')[0].replace(',', '')}`}>
                        <div className="subcategory__item__right__text">
                           <p className="subcategory__order-info">{el.extended1}</p>
                           <p className="subcategory__order-info">{el.extended2}</p>
                        </div>
                        <button className="subcategory__item__button">К покупкам</button>
                     </div>
                  </li>
               ) : (
                  <li onClick={() => handleLiClick(el.name)} className={`subcategory__item ${category} ${el.name.split(' ').length === 1 ? el.name : el.name.split(' ')[0].replace(',', '')}`} key={el.name}>
                     <p className={`subcategory__title ${category}`}>{el.name}</p>
                     {el.extra &&
                        <span className='subcategory__extra'>{el.extra}</span>
                     }
                  </li>
               )
            )}
         </ul>
      </section>
   );
};

export default Categories;