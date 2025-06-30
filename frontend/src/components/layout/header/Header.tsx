import { FC, useState, useContext, lazy, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { useMessage } from '../../../context/MessageContext';
import { useCategory } from '../../../context/CategoryContext';
import { useModal } from '../../../context/ModalContext';
import Notifications from '../../UI/Notifications/Notifications';
import SearchBar from './SearchBar';
import { navItems } from '../../../data/navItems';
import { catalogItems } from '../../../data/catalogItems';
import logo from '../../../images/webpImages/logo.webp';
import './Header.scss';

const NavProfile = lazy(() => import('../../UI/NavProfile/NavProfile'));

interface IHeaderProps {
   deviceWidth: number;
   isProfileOpen: boolean;
   setIsProfileOpen: (value: boolean) => void;
}

const Header: FC<IHeaderProps> = ({ deviceWidth, isProfileOpen, setIsProfileOpen }) => {
   const { isAuthed } = useContext(AuthContext) || { isAuthed: false };
   const [isCatalogOpen, setIsCatalogOpen] = useState<boolean>(false);
   const [currCatalogItem, setCurrCatalogItem] = useState<string>('Супермаркет');
   const [isMobileItemActive, setIsMobileItemActive] = useState<boolean>(false);
   const [isMobileSearchOpen, setIsMobileSearchOpen] = useState<boolean>(false);

   const navigate = useNavigate();
   const { setMessage } = useMessage();
   const { setSelectedCategory } = useCategory();
   const { openModal } = useModal();

   const handleCatalogClick = () : void => {
      setIsCatalogOpen(prevVal => !prevVal);
   };

   const handleCategoryClick = (e: React.MouseEvent<HTMLLIElement>) : void => {
      const target = e.target as HTMLLIElement;
      setCurrCatalogItem(target.textContent || '');
      setIsMobileItemActive(true);
   };

   const handleMobileSearch = () => {
      setIsMobileSearchOpen((prev: boolean) => !prev);
   };

   if (deviceWidth < 769) {
      return (
         <header className="header">
            <nav className='nav'>
               <div className='nav__top nav__top--mobile'>
                  <div className="nav__top--left">
                     <button className={`nav__button nav__button--mobile nav__button--catalog${isCatalogOpen ? ' active' : ''}`} onClick={handleCatalogClick} title="Каталог" aria-label="Каталог">Каталог</button>
                     <div className="nav__logo">
                        <NavLink to='/'>
                           <img src={logo} alt="Ильинский" className="nav__logo-img" />
                        </NavLink>
                     </div>
                  </div>
                  <div className="nav__top--right">
                     <div className="nav__locations">
                        <button onClick={() => openModal('delivery')} className='nav__button nav__button--location'>
                           <div className="nav__button--location-left nav__button--location-left--single">МСК</div>
                        </button>
                     </div>
                     <div className="nav__user">
                        <div className="nav__search">
                           <button onClick={handleMobileSearch} className='nav__button--search'></button>
                        </div>
                     </div>
                  </div>
               </div>
               {isCatalogOpen &&
                  <div className="nav__catalog">
                        {!isMobileItemActive ? (
                           <>
                              <ul className="nav__catalog__list--default">
                                 <li className="nav__catalog__item nav__catalog__title">
                                    Каталог
                                 </li>
                                 {catalogItems.map(item =>
                                    <li className="nav__catalog__item" key={item.category} onClick={handleCategoryClick}>{item.category}</li>
                                 )}
                              </ul>
                              <ul className='nav__catalog__list--default nav__catalog__list--extra'>
                                 <li className="nav__catalog__item nav__catalog__title">
                                    Профиль
                                 </li>
                                 <li className="nav__catalog__item nav__catalog__item--noexpand">
                                    {isAuthed ? 'Имя Фамилия' : 'Войти'}
                                 </li>
                                 <li className="nav__catalog__item nav__catalog__item--noexpand">
                                    Заказы
                                 </li>
                                 <li className="nav__catalog__item nav__catalog__item--noexpand">
                                    Бонусы
                                 </li>
                                 <li className="nav__catalog__item nav__catalog__item--noexpand">
                                    Избранное
                                 </li>
                                 <li className="nav__catalog__item nav__catalog__item--noexpand">
                                    Выход
                                 </li>
                              </ul>
                              <ul className='nav__catalog__list--default nav__catalog__list--extra'>
                                 <li className="nav__catalog__item nav__catalog__title">
                                    Ильинский клуб
                                 </li>
                                 <li className="nav__catalog__item nav__catalog__item--noexpand">
                                    <Link to='' className='nav__catalog__item-link'>Доставка и оплата</Link>
                                 </li>
                                 <li className="nav__catalog__item nav__catalog__item--noexpand">
                                    Программа лояльности
                                 </li>
                                 <li className="nav__catalog__item nav__catalog__item--noexpand">
                                    Политика конфиденциальности
                                 </li>
                                 <li className="nav__catalog__item nav__catalog__item--noexpand">
                                    <Link to='/vacancies' className='nav__catalog__item-link'>Вакансии</Link>
                                 </li>
                              </ul>
                           </>
                           
                        ) : (
                           <ul className="nav__catalog__list nav__catalog__list--more">
                              <li className="nav__catalog__item nav__catalog__title">
                                 <button onClick={() => setIsMobileItemActive(false)} className='nav__catalog__item-button'></button>{currCatalogItem}
                              </li>
                              {catalogItems.find(item => item.category === currCatalogItem)?.categoryItems.map(subItem => (
                                 <li key={subItem} onClick={() => { setSelectedCategory(subItem); navigate('/catalog') }} className="nav__catalog__subitem">{subItem}</li>
                              ))}
                           </ul>
                        )}
                  </div>
               }
               <div className="nav__bottom">
                  {isMobileSearchOpen ? (
                     <SearchBar />
                  ) : (
                     <>
                        <ul className="nav__list">
                           {navItems.map((item: string, id: number) => (
                              item === 'Акции' ? (
                                 <NavLink to='/sales' className='nav__link' id={'nav__link-' + id} key={id}>
                                    {item}
                                 </NavLink>
                              ) : (
                                 <li className='nav__item' key={id}>
                                    <button className='nav__link' id={'nav__link-' + id}>{item}</button>
                                 </li>
                              )
                           ))}
                        </ul>
                        <Notifications />
                     </>
                  )}
               </div>
            </nav>
         </header>
      )
   }

   if (deviceWidth < 1024) {
      return (
         <header className="header">
            <div className="header__inner">
               <p className="header__text">Питайтесь разнообразно и копите <span className="header__important">скидку</span> до 10%</p>
               <button className="header__button">Получить скидку</button>
            </div>
            <nav className='nav'>
               <div className='nav__top'>
                  <div className="nav__logo">
                     <NavLink to='/'>
                        <img src={logo} alt="Ильинский" className="nav__logo-img" />
                     </NavLink>
                  </div>
                  <button className={`nav__button nav__button--tablet nav__button--catalog${isCatalogOpen ? ' active' : ''}`} onClick={handleCatalogClick} title="Каталог" aria-label="Каталог"></button>
                  <div className="nav__search">
                     <SearchBar />
                  </div>
                  <div className="nav__locations">
                     <button onClick={() => openModal('delivery')} className='nav__button nav__button--location'>
                        <div className="nav__button--location-left nav__button--location-left--single">МСК</div>
                     </button>
                  </div>
                  <div className="nav__user">

                  </div>
               </div>
               {isCatalogOpen &&
                  <div className="nav__catalog">
                     <div className="nav__catalog__left">
                        <ul className="nav__catalog__list">
                           {catalogItems.map(item =>
                              <li className="nav__catalog__item" key={item.category} onClick={handleCategoryClick}>{item.category}</li>
                           )}
                        </ul>
                     </div>
                     <div className="nav__catalog__divider"></div>
                     <div className="nav__catalog__right">
                        <ul className="nav__catalog__list">
                           <li className="nav__catalog__item nav__catalog__title">{currCatalogItem}</li>
                           {catalogItems.find(item => item.category === currCatalogItem)?.categoryItems.map(subItem => (
                              <li key={subItem} onClick={() => { setSelectedCategory(subItem); navigate('/catalog') }} className="nav__catalog__subitem">{subItem}</li>
                           ))}
                        </ul>
                     </div>
                  </div>
               }
               <div className="nav__bottom">
                  <ul className="nav__list">
                     {navItems.map((item: string, id: number) => (
                        item === 'Акции' ? (
                           <NavLink to='/sales' className='nav__link' id={'nav__link-' + id} key={id}>
                              {item}
                           </NavLink>
                        ) : (
                           <li className='nav__item' key={id}>
                              <button className='nav__link' id={'nav__link-' + id}>{item}</button>
                           </li>
                        )
                     ))}
                  </ul>
                  <Notifications />
               </div>
            </nav>
         </header>
      );
   }

   return (
      <header className="header">
         <div className="header__inner">
            <p className="header__text">Питайтесь разнообразно и копите <span className="header__important">скидку</span> до 10%</p>
            <button className="header__button">Получить скидку</button>
         </div>
         <nav className='nav'>
            <div className='nav__top'>
               <div className="nav__logo">
                  <NavLink to='/'>
                     <img src={logo} alt="Ильинский" className="nav__logo-img" />
                  </NavLink>
               </div>
               <button className={`nav__button nav__button--catalog${isCatalogOpen ? ' active' : ''}`} onClick={handleCatalogClick} title="Каталог" aria-label="Каталог">Каталог</button>
               <div className="nav__search">
                  <SearchBar />
               </div>
               <div className="nav__locations">
                  <button onClick={() => openModal('delivery')} className='nav__button nav__button--location'>
                     <div className={"nav__button--location-left"}>МСК</div>
                        <div className="nav__button--location-right" title='Выберите способ получения Доставка или самовывоз' aria-label='Выберите способ получения Доставка или самовывоз'>Выберите способ получения Доставка или самовывоз</div>
                  </button>
               </div>
               <div className="nav__user">
                  {deviceWidth > 1155 &&
                     <button onClick={ () => isAuthed ? navigate('/profile/favorites') : setMessage('Пожалуйста, авторизуйтесь') } className="nav__user-action nav__user-action--like" title="Избранное"></button>
                  }
                  <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="nav__user-action nav__user-action--profile" title="Войти"></button>
                  {isProfileOpen &&
                     <NavProfile />
                  }
                  <Link to='/cart' className="nav__user-action nav__user-action--cart" title="Корзина" aria-label='Корзина'>Корзина</Link>
               </div>
            </div>
            {isCatalogOpen &&
               <div className="nav__catalog">
                  <div className="nav__catalog__left">
                     <ul className="nav__catalog__list">
                        {catalogItems.map(item =>
                           <li className="nav__catalog__item" key={item.category} onClick={handleCategoryClick}>{item.category}</li>
                        )}
                     </ul>
                  </div>
                  <div className="nav__catalog__divider"></div>
                  <div className="nav__catalog__right">
                     <ul className="nav__catalog__list">
                        <li className="nav__catalog__item nav__catalog__title">{currCatalogItem}</li>
                        {catalogItems.find(item => item.category === currCatalogItem)?.categoryItems.map(subItem => (
                           <li key={subItem} onClick={() => { setSelectedCategory(subItem); navigate('/catalog') }} className="nav__catalog__subitem">{subItem}</li>
                        ))}
                     </ul>
                  </div>
               </div>
            }
            <div className="nav__bottom">
               <ul className="nav__list">
                  {navItems.map((item: string, id: number) => (
                     item === 'Акции' ? (
                        <NavLink to='/sales' className='nav__link' id={'nav__link-' + id} key={id}>
                           {item}
                        </NavLink>
                     ) : (
                        <li className='nav__item' key={id}>
                           <button className='nav__link' id={'nav__link-' + id}>{item}</button>
                        </li>
                     )
                  ))}
               </ul>
               <Notifications />
            </div>
         </nav>
      </header>
   );
};

export default Header;