import React, { FC, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './NavProfile.scss';

const NavProfile: FC = () => {
    const currAuthContext = useContext(AuthContext) || { isAuthed: false };
    const { isAuthed } = currAuthContext; 

    const authedItems: string[] = ['Профиль', 'Заказы', 'Бонусы', 'Избранное', 'Выход'];

    return (
        <>
            {!isAuthed ? (
                <div className='profile profile--user'>
                    <p className="profile--user__title">Имя Фамилия</p>
                    <ul className="profile--user__list">
                        {authedItems.map((item, index) =>
                            <li className="profile--user__item" key={`${item}${index}`}>
                                {item}
                            </li>
                        )}
                    </ul>
                </div>
            ) : (
                <div className='profile profile--guest guest__step1'>
                    <p className="profile--guest__title">Авторизуйтесь</p>
                    <ul className="profile--guest__list">
                        <li className="profile--guest__item profile--guest__item--1">
                            Покупайте продукты со скидкой
                        </li>
                        <li className="profile--guest__item profile--guest__item--2">
                            Заказывайте товары с доставкой день в день
                        </li>
                        <li className="profile--guest__item profile--guest__item--3">
                            Узнавайте первыми и участвуйте в акциях
                        </li>
                    </ul>
                    <button className="profile--guest__button">Войти по номеру телефона</button>
                </div>
            )}
        </>
    )
}

export default NavProfile
