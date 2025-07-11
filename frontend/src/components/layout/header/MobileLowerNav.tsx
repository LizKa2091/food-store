import React, { FC, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { useMessage } from '../../../context/MessageContext';
import { useModal } from '../../../context/ModalContext';
import './MobileLowerNav.scss';

interface IMobileLowerNavProps {
   isProfileOpen: boolean;
   setIsProfileOpen: (value: boolean) => void;
   handleCatalogChange: () => void;
};

const MobileLowerNav: FC<IMobileLowerNavProps> = ({ isProfileOpen, setIsProfileOpen, handleCatalogChange }) => {
   const { isAuthed } = useContext(AuthContext) || { isAuthed: false };
   const { setMessage } = useMessage();
   const { openModal, closeModal } = useModal();
   const navigate = useNavigate();

   const handleOpenProfile = (): void => {
      if (isProfileOpen) {
         closeModal();
         setIsProfileOpen(!isProfileOpen);
         return;
      };

      setIsProfileOpen(!isProfileOpen);
      if (!isAuthed) openModal('mobileAuth');
   };

   return (
      <nav className='nav-mobile'>
         <ul className="nav-mobile__list">
            <li className="nav-mobile__item">
               <button onClick={handleCatalogChange} className="nav-mobile__button nav-mobile__button--catalog" aria-label='Каталог'>
                  Каталог
               </button>
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
               <button onClick={handleOpenProfile} className="nav-mobile__button nav-mobile__button--login" aria-label="Профиль">
                  Профиль
               </button>
            </li>
         </ul>
      </nav>
   )
}

export default MobileLowerNav;