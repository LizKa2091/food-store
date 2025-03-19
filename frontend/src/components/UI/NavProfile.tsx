import React, { FC, useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { postPhoneNum, postCode, verifyUser, logout, createBonusCard } from '../../services/authService';
import PinInput from './PinInput';
import { useMessage } from '../../context/MessageContext';
import './NavProfile.scss';

const NavProfile: FC = () => {
    const currAuthContext = useContext(AuthContext) || { isAuthed: false };
    const [isAuthed, setIsAuthed] = useState<boolean>(currAuthContext.isAuthed);
    const [currStep, setCurrStep] = useState<number>(1);
    const [currUserTel, setCurrUserTel] = useState<string>('');
    const [currCode, setCurrCode] = useState<string>('');
    const [currUserCode, setCurrUserCode] = useState<string>('');
    const [isCodeCorrect, setIsCodeCorrect] = useState<boolean | null>(null);

    const { setMessage } = useMessage();
    
    useEffect(() => {
        if (currStep === 3) {
            getGeneratedCode();
        }
    }, [currStep]);

    useEffect(() => {
        isUserAuthed();
    }, [])

    const authedItems: string[] = ['Профиль', 'Заказы', 'Бонусы', 'Избранное', 'Выход'];

    const handleStepButton = (): void => {
        setMessage('');

        if (currStep < 3) {
            setCurrStep((prevVal: number) => prevVal+1);
        }
        else {
            setCurrStep(1);
            setIsAuthed(true);
        }
    };

    const handleInputTelChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setCurrUserTel(e.target.value);
    };

    const handleCheckCodeButton = async (): Promise<void> => {
        verifyCode();
    };

    const handleStep2Submit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        const phoneNum = currUserTel.trim();
        const phoneRegExp: RegExp = /^\d{11}$/;
        const phoneInput = (e.target as HTMLFormElement).tel;

        if (!phoneRegExp.test(phoneNum)) {
            phoneInput.classList.add('wrong-phone');
            setMessage("Номер телефона должен содержать 11 цифр");
            return;
        }
        else {
            phoneInput.classList.remove('wrong-phone');
        }

        const isCheckedConfidence = (e.target as HTMLFormElement).confidence.checked;
        const isCheckedNews = (e.target as HTMLFormElement).news.checked;

        if (!isCheckedConfidence || !isCheckedNews) {
            return;
        }

        handleStepButton();
    };

    const getGeneratedCode = async (): Promise<void> => {
        let response;

        try {
            response = await postPhoneNum(currUserTel);

            let resultCode = response?.verificationCode;
            setCurrCode(resultCode);
        }
        catch (e) {
            setMessage(response.message)
        }     
    };

    const verifyCode = async (): Promise<void> => {
        let response;
        try {
            response = await postCode(currUserTel, currUserCode);
            
            if (response.token) {
                localStorage.setItem('token', response.token);
                setIsAuthed(true);
                setIsCodeCorrect(true);
                createBonusCard(currUserTel);
            }
            else {
                setMessage(response.message);
                setIsCodeCorrect(false);
            }
        }
        catch (e) {
            setMessage(response.message);
            setIsCodeCorrect(false);
        }
    };

    const isUserAuthed = async (): Promise<void> => {
        const userToken = localStorage.getItem('token');
        let response;

        if (userToken) {
            response = await verifyUser(userToken);
            
            if (response?.isAuthenticated === true) {
                setIsAuthed(true);
            }
            // else {
            //     setMessage("Пожалуйста, авторизуйтесь");
            // }
        }
        // else {
        //     setMessage("Пожалуйста, авторизуйтесь");
        // }
    };

    const handleLogout = async (): Promise<void> => {
        const userToken = localStorage.getItem('token');
        let response;

        try {
            if (userToken) {
                response = await logout(userToken);
                
                if (response?.isSuccess) {
                    localStorage.removeItem('token');
                    setIsAuthed(false);
                    resetForm();
                }
                else {  
                    setMessage(response.message);
                }
            }
        }
        catch (e) {
            setMessage(response.message);
        }
    };

    const resetForm = () => {
        setCurrStep(1);
        setCurrCode('');
        setCurrUserCode('');
        setCurrUserTel('');
        setIsCodeCorrect(null);
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
                                    {item === 'Выход' ? (
                                        <button onClick={ handleLogout } className="profile--user__logout-button">
                                            {item}
                                        </button>
                                    ) : (
                                        item === 'Профиль' ? (
                                            <Link to='/profile' className="profile--user__profile-button">
                                                {item}
                                            </Link>
                                        ) : (
                                            item
                                        )
                                    )}
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
                                <button className="profile--guest__button" onClick={ handleStepButton }>Войти по номеру телефона</button>
                            </div>
                        </div>
                    )}
                    {currStep === 2 && (
                        <div className='profile profile--guest guest__step2'>
                            <div className="profile__inner">
                            <p className="profile--guest__title profile--guest__title--2">Введите номер телефона</p>
                            <form onSubmit={ handleStep2Submit } className='profile--guest__form'>
                                <div className="profile--guest__form--item profile--guest__inputdiv">
                                    <label htmlFor="tel" className='profile--guest__label profile--guest__label--phone'>Ваш телефон</label>
                                    <input onChange={ handleInputTelChange } type="tel" name="tel" className='profile--guest__input'/>
                                </div>
                                <div className="profile--guest__form--item">
                                    <input type="checkbox" name="confidence" className='profile--guest__checkbox' required={true}/>
                                    <label htmlFor="confidence" className="profile--guest__label">Соглашаюсь с политикой конфиденциальности</label>
                                </div>
                                <div className="profile--guest__form--item">
                                    <input type="checkbox" name="news" className='profile--guest__checkbox' required={true}/>
                                    <label htmlFor="news" className="profile--guest__label">Соглашаюсь получать новости и специальные предложения</label>
                                </div>
                                <button className="profile--guest__button">Получить код по SMS</button>
                            </form>
                            </div>
                        </div>
                        )}
                        {currStep === 3 && (
                            <div className='profile profile--guest guest__step3'>
                                <div className="profile__inner">
                                    <p className="profile--guest__title profile--guest__title--3">Подтверждение</p>
                                    <p className="profile--guest__text">Код подтверждения отправлен на номер  +{currUserTel}</p>
                                    <p className="profile--guest__extra">Введите код подтверждения</p>
                                    {currCode ? (
                                        <span className="profile--guest__extra">Текущий код: {currCode}</span>
                                    ) : (
                                        <span className="profile--guest__extra">ожидается получение кода...</span>
                                    )
                                    }
                                    <PinInput onCodeChange={(code) => setCurrUserCode(code)} isCorrect={isCodeCorrect}/>
                                    {isCodeCorrect &&
                                        <span className="profile--guest__extra">Вход выполнен успешно</span>
                                    }
                                    <button onClick={ handleCheckCodeButton } className="profile--guest__button profile--guest__button--3">Подтвердить</button>
                                </div>
                            </div>
                        )}
                    </>
            )}
        </>
    )
}

export default NavProfile
