import React, { FC, useState, useEffect } from 'react';
import './UserProfileInfo.scss';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../services/authService';
import { fetchBonusCard, fetchUserInfo } from '../../../services/userService';

interface UserInfo {
    nameSurname: string;
    phoneNumber: string;
    dateOfBirth: string;
    email: string;
};

interface UserBonuses {
    bonuses: string;
}

const UserProfileInfo: FC = () => {
    const [activeNavItem, setActiveNavItem] = useState<string>('Личные данные');
    const [isInfoLoading, setIsInfoLoading] = useState<boolean>(false);
    const [isCardLoading, setIsCardLoading] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<UserInfo>({ nameSurname: '', phoneNumber: '', dateOfBirth: '', email: '' });
    const [userBonusCard, setUserBonusCard] = useState<UserBonuses>({ bonuses: '' });

    useEffect(() => {
        loadUserInfo();
        loadUserCard();
    }, []);

    const navigate = useNavigate();

    const mainItems: string[] = ['Личные данные', 'История заказов', 'Избранное'];

    const handleLogout = async () => {
        const userToken = localStorage.getItem('token');

        if (userToken) {
            const response = await logout(userToken);

            if (response.isSuccess) {
                localStorage.removeItem('token');
                navigate('/');
            }
        }
        else {
            throw new Error('ошибка, токен пользователя не найден');
        }
    };

    const loadUserInfo = async () => {
        setIsInfoLoading(true);

        const token = localStorage.getItem('token');

        if (token) {
            const result = await fetchUserInfo(token);

            setIsInfoLoading(false);
            setUserInfo(result.user)
        }
        else {
            throw new Error('ошибка, пользователь не авторизован');
        }
    };

    const loadUserCard = async () => {
        setIsCardLoading(true);

        const token = localStorage.getItem('token');

        if (token) {
            const result = await fetchBonusCard(token);

            setIsCardLoading(false);
            setUserBonusCard(result.bonusCard)
        }
        else {
            throw new Error('ошибка, пользователь не авторизован');
        }
    };

    return (
        <main className="main">
            <div className='main__selection'>
                <ul className="main__list">
                    {mainItems.map((item, index) => 
                        <li 
                            key={index}
                            onClick={ () => setActiveNavItem(item) }
                            className={'main__item' + (item === activeNavItem ? ' main__item--active' : '')}
                        >
                            {item}
                        </li>
                    )}
                </ul>
            </div>
            <div className="main__inner">
                {activeNavItem === 'Личные данные' && 
                    <>
                        {isInfoLoading ? (
                            <span className='loader'>Загрузка...</span>
                        ) : (
                            <>
                                <form className='main__form'>
                                    <div className="main__form__item">
                                        <label htmlFor="name" className="main__form__label">Имя Фамилия</label>
                                        <input type="text" id='name' className="main__form__input" value={userInfo.nameSurname}/>
                                    </div>
                                    <div className="main__form__item">
                                        <label htmlFor="tel" className="main__form__label">Номер телефона</label>
                                        <input type="tel" id='tel' className="main__form__input main__form__input--protected" value={userInfo.phoneNumber} />
                                    </div>
                                    <div className="main__form__item main__form__item--birthday">
                                        <label htmlFor="date" className="main__form__label">День рождения</label>
                                        <input type="date" id='date' className="main__form__input main__form__input--protected" value={userInfo.dateOfBirth}/>
                                    </div>
                                    <div className="main__form__item main__form__item--mail">
                                        <label htmlFor="mail" className="main__form__label">Эл. почта</label>
                                        <input type="email" id='mail' className="main__form__input main__form__input" value={userInfo.email}/>
                                    </div>
                                    <button type='submit' className="main__form__button">Сохранить</button>
                                </form>
                                <button onClick={ handleLogout } className='main__button'>Выйти</button>
                            </>
                        )}
                        <div className='bonus'>
                            {isCardLoading ? (
                                <span className='loader'>Загрузка...</span>
                            ) : (
                                <>
                                    <p className="bonus__text">Получайте кэшбек до 5% с каждого заказа и оплачивайте покупки</p>
                                    <p className="bonus__card-number">Карта №</p>
                                    <div className="bonus__extra">
                                        <p className="bonus__extra__title">Бонусы</p>
                                        <p className="bonus__extra__amount">{userBonusCard.bonuses}</p>
                                    </div>
                                </>
                            )}
                        </div>
                    </>
                }
            </div>
        </main>
    )
};

export default UserProfileInfo;