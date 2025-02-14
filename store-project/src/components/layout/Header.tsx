import '../layout/Header.scss';
import logo from '../../images/logo.png';

const Header = () => {
    return (
        <header className="header">
            <div className="header__inner">
                <p className="header__text">Питайтесь разнообразно и копите <span className="header__important">скидку</span> до 10%</p>
                <button className="header__button">Получить скидку</button>
            </div>
            <nav className='nav'>
                <div className='nav__top'>
                    <div className="nav__logo">
                        <a href='#'>
                            <img src={logo} alt="Ильинский" className="nav__logo-img" />
                        </a>
                    </div>
                    <button className="nav__button nav__button--catalog">Каталог</button>
                    <div className="nav__search">
                        <input type="text" className="nav__input" />
                    </div>
                    <div className="nav__locations">
                        <button className="nav__button nav__button--location-left">МСК</button>
                        <button className="nav__button nav__button--location-right">Выберите способ получения Доставка или самовывоз</button>
                    </div>
                    <div className="nav__user">
                        <button className="nav__user-action nav__user-action--like">понравившиеся</button>
                        <button className="nav__user-action nav__user-action--profile">профиль</button>
                        <button className="nav__user-action nav__user-action--cart">Корзина</button>
                    </div>
                </div>
                <div className="nav__bottom">
                    <ul className="nav__list">
                        <li className="nav__item">
                            <button className="nav__button nav__link">Супермаркет</button>
                        </li>
                        <li className="nav__item">
                        <button className="nav__button nav__link">Кулинария</button>
                        </li>
                        <li className="nav__item">
                            <button className="nav__link">Заморозка</button>
                        </li>
                        <li className="nav__item">
                            <button className="nav__link">Другое</button>
                        </li>
                        <li className="nav__item">
                            <button className="nav__link">Акции</button>
                        </li>
                        <li className="nav__item">
                            <button className="nav__link">Магазины</button>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;