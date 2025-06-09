import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCategory } from '../../../context/CategoryContext';
import { ISubCategory } from '../../../types/products.types';
import './Categories.scss';
import { subCategories } from '../../../data/subcategories';

export type CategoryType = 'Супермаркет' | 'Кулинария' | 'Заморозка' | 'Другое' | 'Акции';

interface ICategoriesProps {
   category: CategoryType;
   type?: 'extended';
   selectedSubcategory?: string;
}

const Categories: FC<ICategoriesProps> = ({ category, type }) => {
   const navigate = useNavigate();
   const { setSelectedCategory } = useCategory();

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
            {subCategories[category].map((el: ISubCategory) => 
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