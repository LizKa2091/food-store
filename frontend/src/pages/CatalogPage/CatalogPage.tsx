import React, { FC, useState, useEffect, useContext } from 'react';
import { useCategory } from '../../context/CategoryContext';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import { useMessage } from '../../context/MessageContext';
import { getCatalogProducts, searchProductByKeyword } from '../../services/productService';
import { fetchUserFavorites } from '../../services/userService';
import FavoriteButton from '../../components/UI/FavoriteButton/FavoriteButton';
import ItemQuantityButton from '../../components/UI/ItemQuantityButton/ItemQuantityButton';
import Wrapper from '../../components/layout/Wrapper';
import Header from '../../components/layout/header/Header';
import Footer from '../../components/layout/Footer';
import SalesAndRecommendation from '../../components/UI/SalesAndRecommendation/SalesAndRecommendation';
import { IFavoriteItem } from '../../types/cart.types';
import { IItemShortInfo, ISubCategory } from '../../types/products.types';
import './CatalogPage.scss';
import { useParams } from 'react-router-dom';

type CategoryType = 'Супермаркет' | 'Кулинария' | 'Заморозка' | 'Другое';

type productResponse = {
   products: IItemShortInfo[];
};

const CatalogPage: FC = () => {
   const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
   const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
   const [currProducts, setCurrProducts] = useState<productResponse | undefined>(undefined);
   const [filtersResult, setFiltersResult] = useState<IItemShortInfo[]>([]);
   const [displayProductsList, setDisplayProductsList] = useState<IItemShortInfo[] | undefined>(undefined);
   const [userFavorites, setUserFavorites] = useState<string[] | null>(null);
   const [keyWord, setKeyWord] = useState<string>('');

   const params = useParams();

   const { selectedCategory, setSelectedCategory  } = useCategory();

   const authContext = useContext(AuthContext);

   const cartContext = useContext(CartContext) || { cartItems: [], addItem: async () => {}, updateItem: async () => {}, removeItem: async () => {}, initCart: async () => {} };
   const { initCart, cartItems } = cartContext;

   const { setMessage } = useMessage();

   useEffect(() => {
      if (params?.keyword) setKeyWord(params.keyword);
   }, [params])

   useEffect(() => {
      getUserFavorites();
   }, [isModalOpened]);

   useEffect(() => {
      if (authContext?.isAuthed) initCartState();
   }, [authContext]);

   useEffect(() => {
      if (keyWord) {
         getResultsByKeyword(keyWord);
      }
   }, [keyWord]);

   useEffect(() => {
      const getProducts = async () => {
         if (selectedCategory) {
            let result = await getCatalogProducts(selectedCategory);
            
            if (result.message) {
               setDisplayProductsList([]);
               console.error(result.message);
               setMessage(result.message);
            }
            else setCurrProducts(result);
         }   
      };

      getProducts();
   }, [selectedCategory]);

   useEffect(() => {
      if (selectedFilters && currProducts) {
         setFiltersResult(currProducts.products.filter((product: IItemShortInfo) => product.filterCategory && selectedFilters.includes(product.filterCategory)))
      }
   }, [selectedFilters, currProducts]);

   useEffect(() => {
      if (selectedFilters.length > 0) setDisplayProductsList(filtersResult)
      else if (currProducts) setDisplayProductsList(currProducts.products);
   }, [selectedFilters, currProducts, filtersResult])

   const getResultsByKeyword = async (key: string) => {
      try {
         const result = await searchProductByKeyword(key);
         
         if (result.message) {
            setMessage(result.message);
            setDisplayProductsList([]);
         }
         else if (result && 'error' in result) {
           console.error(result.error);
           setMessage(result.message || result.error);
           setDisplayProductsList([]);
           return;
         }

         setDisplayProductsList(result.products);
      } 
      catch (error) {
         console.error(error);
      }
   };

   const initCartState = async () => {
      const token = localStorage.getItem('token');
      try {
         if (!token) throw new Error('ошибка, пользователь не авторизован');

         const result = await initCart(token);
         
         if (result && 'error' in result) {
           console.error(result.error);
           return;
         }
      } 
      catch (error) {
         console.error(error);
      }
   };

   const getUserFavorites = async () => {
      const token = localStorage.getItem('token');

      if (token) {
         let response;
         try {
            response = await fetchUserFavorites(token);

            const favorites = response.favorites.map((item: IFavoriteItem) => item.productId);
            setUserFavorites(favorites);
            setMessage('');
         }
         catch(e) {
            setMessage(response?.message);
         }
      }
   };

   const handleCategorySelect = (category: string) => {
      setSelectedCategory(category);
      setKeyWord('');
   };

   const handleFilterClick = (filter: string) => {
      setSelectedFilters((prev) => {
         if (prev.includes(filter)) return prev.filter((filterItem) => filterItem !== filter)
         return [...prev, filter];
      });
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
                           item.filters && !keyWord && item.filters.map((filterItem) => (
                              <li key={filterItem} className="catalog-section__item catalog-section__item--category">      
                                 <button onClick={() => handleFilterClick(filterItem)} className={'catalog-section__item-button' + (selectedFilters.includes(filterItem) ? ' catalog-section__item-button--selected' : '')}>{filterItem}</button>
                              </li>
                           ))
                        ))
                     ))}
                     <li key={999} className='catalog-section__item catalog-section__item--clear'>
                        {!keyWord && <button onClick={clearFilters} className='catalog-section__item-button--clear'>Очистить фильтры</button>}
                     </li>
                  </ul>
               </div>
               <div className="catalog-section__products">
                  {keyWord && <p>Результаты по поиску: {keyWord}</p>}
                  <ul className="catalog-section__list catalog-section__list--products">
                     {displayProductsList?.length === 0 ? (
                        <p>Продукты не найдены. Попробуйте выбрать другую категорию или ввести другое слово для поиска</p>
                     ) : (
                        displayProductsList?.map((product: IItemShortInfo) => (
                           <li key={product.productId} className="catalog-section__item catalog-section__item--product">
                              <FavoriteButton productId={product.productId} initialFavState={userFavorites ? userFavorites.includes(product.productId) : false} />
                              <img src={product.imagePath} alt={product.name} className="catalog-section__item-img" />
                              <div className="catalog-section__item-container">
                                 <p className="catalog-section__item-quantity">В наличии {product.stockQuantity}</p>
                                 <p className="catalog-section__item-name">{product.name}</p>
                                 <div className="catalog-section__item-bottom">
                                    <div className="catalog-section__item-prices">
                                       <p className={"catalog-section__item-new-price" + (product.newPrice ? ' catalog-section__item-new-price-red' : '')}>{product.price} руб</p>
                                       {product.newPrice &&
                                          <p className="catalog-section__item-old-price">{product.price} руб</p>
                                       }
                                    </div>
                                    <ItemQuantityButton itemId={product.productId} storageQuantity={product.stockQuantity} currCart={cartItems}/>
                                 </div>
                              </div>
                           </li> 
                        ))
                     )}
                  </ul>
               </div>
            </section>
         </div>
         <SalesAndRecommendation modalState={isModalOpened} onModalChange={handleModalChange} type='Рекомендации для вас' />
         <Footer />
      </Wrapper>
   )
};

export default CatalogPage;
