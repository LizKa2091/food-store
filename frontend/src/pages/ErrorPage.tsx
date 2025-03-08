import React from 'react';
import { Link } from 'react-router-dom';
import donutZero from '../images/404.png';
import './ErrorPage.scss';

const ErrorPage = () => {
  return (
    <div className='error'>
        <h4 className="error__title">ошибка</h4>
        <div className="error__container--numbers">
            <p className="error__left error__num">4</p>
            <img src={donutZero} alt="0" className="error__img" />
            <p className="error__right error__num">4</p>
        </div>
        <p className="error__subtitle">
            Ой! Кажется что-то пошло не так. Страница, которую вы запрашиваете, 
            не существует. Возможно она устарела, была удалена, или был введен 
            неверный адрес в адресной строке.
        </p>
        <Link to='/' className="error__button">Перейти на главную</Link>
    </div>
  )
}

export default ErrorPage
