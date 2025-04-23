import React, { FC, useState, useEffect } from 'react';
import PersonalData from './PersonalData';
import OrderHistory from './OrderHistory';
import Favorites from './Favorites';
import './UserProfileInfo.scss';

interface IUserProfileInfoProps {
   section: string;
};

const UserProfileInfo: FC<IUserProfileInfoProps> = ({ section }) => {
   const [activeNavItem, setActiveNavItem] = useState<string>(section);

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

   return (
      <main className="main-user">
         <div className='main-user__selection'>
            <ul className="main-user__list">
               {mainItems.map((item, index) => 
                  <li 
                     key={index}
                     onClick={ () => setActiveNavItem(item) }
                     className={'main-user__item' + (item === activeNavItem ? ' main-user__item--active' : '')}
                  >
                     {item}
                  </li>
               )}
            </ul>
         </div>
         <div className="main__inner">
            {activeNavItem === 'Личные данные' && 
               <PersonalData />
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