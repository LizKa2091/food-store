import { useState, useContext, lazy } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useMessage } from '../../context/MessageContext';
import Notifications from '../UI/Notifications';
import './Header.scss';
import logo from '../../images/webpImages/logo.webp';

const NavProfile = lazy(() => import('../UI/NavProfile'));

const Header: React.FC = () => {
    const navItems: string[] = ['Супермаркет', 'Кулинария', 'Заморозка', 'Другое', 'Акции', 'Магазины'];
    const catalogItems: {category: string, categoryItems: string[]}[] = [{ category: 'Акции', categoryItems: [] }, { category: 'Популярное', categoryItems: [] }, { category: 'Супермаркет', categoryItems: ['Вода и напитки', 'Молоко, масло и яйца', 'Снэки и сухофрукты', 'Кофе, чай и сладости', 'Макароны и крупы', 'Хлеб и выпечка', 'Масло, соусы и специи', 'Консервы и соленья'] }, { category: 'Кулинария', categoryItems: ['Выпечка', 'Пиццы', 'Гриль меню', 'Свежее мясо', 'Салаты', 'Супы', 'Горячие блюда', 'Десерты'] }, { category: 'Заморозка', categoryItems: ['Пельмени, вареники и равиоли', 'Хинкали и манты', 'Полу фабрикаты', 'Замороженные овощи', 'Рыба и морепродукты', 'Мясо'] }, { category: 'Другое', categoryItems: ['Красота и гигиена', 'Стирка и уборка', 'Полезные мелочи', 'Бытовая техника'] }, { category: 'Продукция от Ильинского', categoryItems: [] } ]

    const { isAuthed } = useContext(AuthContext) || { isAuthed: false };
    const [isCatalogOpen, setIsCatalogOpen] = useState(false);
    const [currCatalogItem, setCurrCatalogItem] = useState('Супермаркет');
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const navigate = useNavigate();
    const { setMessage } = useMessage();

    const handleCatalogClick = () : void => {
        setIsCatalogOpen(prevVal => !prevVal);
    };

    const handleCategoryClick = (e: React.MouseEvent<HTMLLIElement>) : void => {
        const target = e.target as HTMLLIElement;
        setCurrCatalogItem(target.textContent || '');
    };

    return (
        <header className="header">
            <div className="header__inner">
                <p className="header__text">Питайтесь разнообразно и копите <span className="header__important">скидку</span> до 10%</p>
                <button className="header__button">Получить скидку</button>
            </div>
            <nav className='nav'>
                <div className='nav__top'>
                    <div className="nav__logo">
                        <Link to='/'>
                            <img src={logo} alt="Ильинский" className="nav__logo-img" />
                        </Link>
                    </div>
                    <button className={`nav__button nav__button--catalog${isCatalogOpen ? ' active' : ''}`} onClick={handleCatalogClick}>Каталог</button>
                    <div className="nav__search">
                        <input type="text" className="nav__input" id='nav-search' name='nav-search'/>
                    </div>
                    <div className="nav__locations">
                        <button className="nav__button nav__button--location-left">МСК</button>
                        <button className="nav__button nav__button--location-right">Выберите способ получения Доставка или самовывоз</button>
                    </div>
                    <div className="nav__user">
                        <button onClick={ () => isAuthed ? navigate('/profile/favorites') : setMessage('Пожалуйста, авторизуйтесь') } className="nav__user-action nav__user-action--like" title="Избранное"></button>
                        <button onClick={() => setIsProfileOpen(prevVal => !prevVal)} className="nav__user-action nav__user-action--profile" title="Войти"></button>
                        {isProfileOpen &&
                            <NavProfile />
                        }
                        <button className="nav__user-action nav__user-action--cart">Корзина</button>
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
                                    <li className="nav__catalog__subitem" key={subItem}>{subItem}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                }
                <div className="nav__bottom">
                    <ul className="nav__list">
                        {navItems.map((item: string, id: number) => (
                           item === 'Акции' ? (
                              <Link to='/sales' className='nav__link' id={'nav__link-' + id} key={id}>
                                 {item}
                              </Link>
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