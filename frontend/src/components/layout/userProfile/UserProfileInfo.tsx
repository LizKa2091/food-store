import React, { FC, useState, useEffect } from 'react';
import PersonalData from './PersonalData';
import OrderHistory from './OrderHistory';
import Favorites from './Favorites';
import BonusCard from './BonusCard';
import { useMessage } from '../../../context/MessageContext';
import { logout } from '../../../services/authService';
import { useNavigate } from 'react-router-dom';
import './UserProfileInfo.scss';

interface IUserProfileInfoProps {
   section: string;
   deviceWidth: number;
};

const UserProfileInfo: FC<IUserProfileInfoProps> = ({ section, deviceWidth }) => {
   const [activeNavItem, setActiveNavItem] = useState<string>(section);
   const [isActiveMobileMenu, setIsActiveMobileMenu] = useState<boolean>(deviceWidth <= 768);

   const { setMessage } = useMessage();
   const navigate = useNavigate();

   useEffect(() => {
      switch (section) {
         case 'personal':
            setActiveNavItem('Личные данные');
            break;
         case 'orders':
            setActiveNavItem('История заказов');
            break;
         case 'favorites':
            setActiveNavItem('Избранное');
            break;
         default:
            setActiveNavItem('Личные данные');
            break;
      }
   }, [section]);

   const mainItems: string[] = ['Личные данные', 'История заказов', 'Избранное'];

   const handleLogout = async () => {
      const userToken = localStorage.getItem('token');

      if (userToken) {
         let response;

         try {
            response = await logout(userToken);

            if (response.isSuccess) {
               localStorage.removeItem('token');
               navigate('/');
            }
            else {
               setMessage('ошибка при выходе');
            }
         }
         catch (e) {
            setMessage(response.message);
         }    
      }
      else {
         setMessage('пользователь не авторизован');
      }
   };

   if (deviceWidth <= 768 && isActiveMobileMenu) {
      return (
         <main className="main-user">
            <div className="main__inner">
               <BonusCard />
               <ul className='main-user__list--mobile'>
                  <li onClick={() => { setActiveNavItem('Личные данные'); setIsActiveMobileMenu(false); }} className="main-user__item--mobile">
                     Личные данные
                  </li>
                  <li onClick={() => { setActiveNavItem('История заказов'); setIsActiveMobileMenu(false); }} className="main-user__item--mobile">
                     История заказов
                  </li>
                  <li onClick={() => { setActiveNavItem('Избранное'); setIsActiveMobileMenu(false); }} className="main-user__item--mobile">
                     Избранное
                  </li>
               </ul>
               <button onClick={handleLogout} className="main-user__button main-user__button--mobile">Выйти</button>
            </div>
         </main>
      )
   }

   else if (deviceWidth <= 768 && !isActiveMobileMenu) {
      return (
         <main className="main-user">
            <div className="main__inner">
               <button onClick={() => setIsActiveMobileMenu(true)} className='main__inner__button'>Назад</button>
               {activeNavItem === 'Личные данные' && 
                  <PersonalData deviceWidth={deviceWidth} />
               }
               {activeNavItem === 'История заказов' &&
                  <OrderHistory />
               }
               {activeNavItem === 'Избранное' &&
                  <Favorites />
               }
            </div>
         </main>
      )
   }

   return (
      <main className="main-user">
         <div className='main-user__selection'>
            <ul className="main-user__list">
               {mainItems.map((item, index) => 
                  <li key={index} onClick={() => setActiveNavItem(item)} className={'main-user__item' + (item === activeNavItem ? ' main-user__item--active' : '')}>
                     {item}
                  </li>
               )}
            </ul>
         </div>
         <div className="main__inner">
            {activeNavItem === 'Личные данные' && 
               <PersonalData deviceWidth={deviceWidth} />
            }
            {activeNavItem === 'История заказов' &&
               <OrderHistory />
            }
            {activeNavItem === 'Избранное' &&
               <Favorites />
            }
         </div>
      </main>
   )
};

export default UserProfileInfo;