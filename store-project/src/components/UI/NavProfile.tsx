import React, { FC, useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './NavProfile.scss';

const NavProfile: FC = () => {
    const currAuthContext = useContext(AuthContext) || { isAuthed: false };
    //const [isAuthed, setIsAuthed] = useState<boolean>(currAuthContext.isAuthed);
    const [isAuthed, setIsAuthed] = useState<boolean>(false);
    const [currStep, setCurrStep] = useState<number>(1);
    const [currTel, setCurrTel] = useState(null);

    const authedItems: string[] = ['Профиль', 'Заказы', 'Бонусы', 'Избранное', 'Выход'];

    const handleStepButton = () => {
        if (currStep < 3) {
            setCurrStep(prevVal => prevVal+1);
        }
        else {
            setCurrStep(1);
            setIsAuthed(true);
        }
    };

    return (
        <>
            {isAuthed ? (
                <div className='profile profile--user'>
                    <div className="profile__inner">
                        <p className="profile--user__title">Имя Фамилия</p>
                        <ul className="profile--user__list">
                            {authedItems.map((item, index) =>
                                <li className="profile--user__item" key={`${item}${index}`}>
                                    {item}
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            ) : (
                <>
                    {currStep === 1 && (
                        <div className='profile profile--guest guest__step1'>
                            <div className="profile__inner">
                                <p className="profile--guest__title profile--guest__title--1">Авторизуйтесь</p>
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
                                <button className="profile--guest__button" onClick={handleStepButton}>Войти по номеру телефона</button>
                            </div>
                        </div>
                    )}
                    {currStep === 2 && (
                        <div className='profile profile--guest guest__step2'>
                            <div className="profile__inner">
                            <p className="profile--guest__title profile--guest__title--2">Введите номер телефона</p>
                            <form action="" className='profile--guest__form'>
                                <div className="profile--guest__form--item profile--guest__inputdiv">
                                    <label htmlFor="tel" className='profile--guest__label profile--guest__label--phone'>Ваш телефон</label>
                                    <input type="tel" name="tel" className='profile--guest__input'/>
                                </div>
                                <div className="profile--guest__form--item">
                                    <input type="checkbox" name="confidence" className='profile--guest__checkbox'/>
                                    <label htmlFor="confidence" className="profile--guest__label">Соглашаюсь с политикой конфиденциальности</label>
                                </div>
                                <div className="profile--guest__form--item">
                                    <input type="checkbox" name="news" className='profile--guest__checkbox'/>
                                    <label htmlFor="news" className="profile--guest__label">Соглашаюсь получать новости и специальные предложения</label>
                                </div>
                            </form>
                            <button className="profile--guest__button" onClick={handleStepButton}>Получить код по SMS</button>
                            </div>
                        </div>
                        )}
                        {currStep === 3 && (
                            <div className='profile profile--guest guest__step3'>
                                <div className="profile__inner">
                                    <p className="profile--guest__title profile--guest__title--3">Подтверждение</p>
                                    <p className="profile--guest__text">Код подтверждения отправлен на номер  +{currTel}</p>
                                    <p className="profile--guest__extra">Введите код подтверждения</p>
                                    <input type="number" className='profile--guest__input--code' />
                                    <button className="profile--guest__button profile--guest__button--3">Подтвердить</button>
                                </div>
                            </div>
                        )}
                    </>
            )}
        </>
    )
}

export default NavProfile
