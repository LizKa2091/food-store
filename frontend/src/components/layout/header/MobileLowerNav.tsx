import React, { FC, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { useMessage } from '../../../context/MessageContext';
import './MobileLowerNav.scss';

const MobileLowerNav: FC = () => {
   const { isAuthed } = useContext(AuthContext) || { isAuthed: false };
   const { setMessage } = useMessage();
   const navigate = useNavigate();

   return (
      <nav className='nav-mobile'>
         <ul className="nav-mobile__list">
            <li className="nav-mobile__item">
               <NavLink to='/catalog' className="nav-mobile__link nav-mobile__link--catalog" aria-label='Каталог'>
                  Каталог
               </NavLink>
            </li>
            <li className="nav-mobile__item">
               <NavLink to='/sales' className="nav-mobile__link nav-mobile__link--sales" aria-label="Акции">
                  Акции
               </NavLink>
            </li>
            <li className="nav-mobile__item">
               <NavLink to='/cart' className="nav-mobile__link nav-mobile__link--cart" aria-label='Корзина'>
                  {!isAuthed ? 'Корзина' : '94.9 руб'}
               </NavLink>
            </li>
            <li className="nav-mobile__item">
               <button onClick={() => isAuthed ? navigate('/profile/favorites') : setMessage('Пожалуйста, авторизуйтесь')} className="nav-mobile__button nav-mobile__button--favorites" aria-label="Избранное">
                  Избранное
               </button>
            </li>
            <li className="nav-mobile__item">
               <button onClick={() => {}} className="nav-mobile__button nav-mobile__button--login" aria-label="Профиль">
                  Профиль
               </button>
            </li>
         </ul>
      </nav>
   )
}

export default MobileLowerNav;