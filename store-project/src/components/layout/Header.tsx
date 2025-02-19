import '../layout/Header.scss';
import logo from '../../images/logo.png';

const Header: React.FC = () => {
    const navItems: string[] = ['Супермаркет', 'Кулинария', 'Заморозка', 'Другое', 'Акции', 'Магазины'];

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
                        <button className="nav__user-action nav__user-action--like" title="Избранное"></button>
                        <button className="nav__user-action nav__user-action--profile" title="Войти"></button>
                        <button className="nav__user-action nav__user-action--cart">Корзина</button>
                    </div>
                </div>
                <div className="nav__bottom">
                    <ul className="nav__list">
                        {navItems.map((item: string, id: number) => (
                            <li className='nav__item' key={id}>
                                <button className='nav__link' id={'nav__link-' + id}>{item}</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;