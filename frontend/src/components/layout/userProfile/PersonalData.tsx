import React, { FC, useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../services/authService';
import { fetchBonusCard, fetchUserInfo, updateUserInfo } from '../../../services/userService';

interface UserInfo {
    nameSurname: string;
    phoneNumber: string;
    dateOfBirth: string;
    email: string;
};

interface UserBonuses {
    bonuses: string;
    cardNumber: string;
};

const PersonalData: FC = () => {
    const [isInfoLoading, setIsInfoLoading] = useState<boolean>(false);
    const [isCardLoading, setIsCardLoading] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<UserInfo>({ nameSurname: '', phoneNumber: '', dateOfBirth: '', email: '' });
    const [userBonusCard, setUserBonusCard] = useState<UserBonuses>({ bonuses: '', cardNumber: '' });
    const [isInputWrong, setIsInputWrong] = useState<boolean>(false);
    const [isFormSaved, setIsFormSaved] = useState<boolean | null>(null);
    const [isDirty, setIsDirty] = useState<boolean>(false);

    useEffect(() => {
        loadUserInfo();
        loadUserCard();
    }, []);

    const navigate = useNavigate();

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

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setUserInfo((prev) => ({
            ...prev,
            nameSurname: e.target.value
        }));
        setIsDirty(true);

        const nameRegex = /^[A-ZА-Я][a-zа-яё]+ [A-ZА-Я][a-zа-яё]+$/;

        if (!nameRegex.test(e.target.value)) {
            e.target.classList.add('wrong-input');
            setIsInputWrong(true);
        }
        else {
            e.target.classList.remove('wrong-input');
            setIsInputWrong(false);
        }
    };

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setUserInfo((prev) => ({
            ...prev,
            email: e.target.value
        }));
        setIsDirty(true);

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(e.target.value)) {
            e.target.classList.add('wrong-input');
            setIsInputWrong(true);
        }
        else {
            e.target.classList.remove('wrong-input');
            setIsInputWrong(false);
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isInputWrong && isDirty) {
            const token = localStorage.getItem('token');

            if (token) {
                const { nameSurname, phoneNumber, dateOfBirth, email } = userInfo;

                const response = await updateUserInfo(token, nameSurname, phoneNumber, dateOfBirth, email);

                if (response.user) {
                    setIsFormSaved(true);
                    setIsDirty(false);
                }
            }
            else {
                throw new Error('ошибка, пользователь не авторизован');
            }
        }
        else if (isDirty) {
            setIsFormSaved(false);
        }
        else {
            setIsFormSaved(!isInputWrong);
        }
    };

    return (
        <>
            {isInfoLoading ? (
                <span className='loader'>Загрузка...</span>
            ) : (
                <>
                    <form onSubmit={ handleSubmit } className='main__form'>
                        <div className="main__form__item">
                            <label htmlFor="name" className="main__form__label">Имя Фамилия</label>
                            <input onChange={ handleNameChange } type="text" id='name' className="main__form__input" value={userInfo.nameSurname}/>
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
                            <input onChange={ handleEmailChange } type="email" id='mail' className="main__form__input main__form__input" value={userInfo.email}/>
                        </div>
                        <button type='submit' className="main__form__button">Сохранить</button>
                            {isFormSaved === true ? (
                                <p>Данные успешно обновлены</p>
                            ) : isFormSaved === false ? (
                                <p>Исправьте все ошибки</p>
                            ) : ''}
                    </form>
                    <button onClick={ handleLogout } className='main__button'>Выйти</button>
                </>
            )}
            <div className='bonus'>
                {isCardLoading ? (
                    <span className='loader'>Загрузка...</span>
                ) : (
                    <div className='bonus__inner'>
                        <div className="bonus__main">
                            <p className="bonus__text">Получайте кэшбек до 5% с каждого заказа и оплачивайте покупки</p>
                            <p className="bonus__text">Карта №{userBonusCard.cardNumber}</p>
                        </div>
                        <div className="bonus__extra">
                            <p className="bonus__extra__title">Бонусы</p>
                            <p className="bonus__extra__amount">{userBonusCard.bonuses}</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
};

export default PersonalData;