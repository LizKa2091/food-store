import React, { FC, useState } from 'react';
import './UserProfileInfo.scss';
import PersonalData from './PersonalData';
import OrderHistory from './OrderHistory';
import Favorites from './Favorites';

const UserProfileInfo: FC = () => {
    const [activeNavItem, setActiveNavItem] = useState<string>('Личные данные');

    const mainItems: string[] = ['Личные данные', 'История заказов', 'Избранное'];

    return (
        <main className="main">
            <div className='main__selection'>
                <ul className="main__list">
                    {mainItems.map((item, index) => 
                        <li 
                            key={index}
                            onClick={ () => setActiveNavItem(item) }
                            className={'main__item' + (item === activeNavItem ? ' main__item--active' : '')}
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