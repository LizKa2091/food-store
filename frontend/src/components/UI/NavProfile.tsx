import React, { FC, useContext, useState, useEffect } from 'react';
import { AuthContext, postPhoneNum, postCode } from '../../context/AuthContext';
import PinInput from './PinInput';
import './NavProfile.scss';

const NavProfile: FC = () => {
    const currAuthContext = useContext(AuthContext) || { isAuthed: false };
    const [isAuthed, setIsAuthed] = useState<boolean>(currAuthContext.isAuthed);
    const [currStep, setCurrStep] = useState<number>(1);
    const [currUserTel, setCurrUserTel] = useState<string>('');
    const [currCode, setCurrCode] = useState<string>('');
    const [currUserCode, setCurrUserCode] = useState<string>('');
    const [isCodeCorrect, setIsCodeCorrect] = useState<boolean | null>(null);
    
    useEffect(() => {
        if (currStep === 3) {
            getGeneratedCode();
        }
    }, [currStep]);

    const authedItems: string[] = ['Профиль', 'Заказы', 'Бонусы', 'Избранное', 'Выход'];

    const handleStepButton = (): void => {
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

    const getGeneratedCode = async (): Promise<void> => {
        let result = await postPhoneNum(currUserTel);
        let resultCode = result.verificationCode;

        setCurrCode(resultCode);
    };

    const verifyCode = async (): Promise<void> => {
        let response = await postCode(currUserTel, currUserCode);

        if (response.status === 400) {
            setIsCodeCorrect(false);
        }
        else {
            localStorage.setItem('token', response.token);
            setIsAuthed(true);
            setIsCodeCorrect(true);
        }
    }

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
                                <button className="profile--guest__button" onClick={ handleStepButton }>Войти по номеру телефона</button>
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
                                    <input onChange={ handleInputTelChange } type="tel" name="tel" className='profile--guest__input'/>
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
                            <button onClick={ handleStepButton } className="profile--guest__button">Получить код по SMS</button>
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
