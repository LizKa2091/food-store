import React, { FC, useContext } from 'react';
import './NavProfile.scss';
import { AuthContext } from '../../context/AuthContext';



const NavProfile: FC = () => {
    const currAuthContext = useContext(AuthContext);
    if (!currAuthContext) return null;

    const {isAuthed} = currAuthContext; 

    const authedItems: string[] = ['Профиль', 'Заказы', 'Бонусы', 'Избранное', 'Выход'];

    return (
        <>
        {isAuthed ?
            <div className='profile--user'>
                <p className="profile--guest__title">Имя Фамилия</p>
                <ul className="profile--guest__list">
                    {authedItems.map((item, index) =>
                        <li className="profile--guest__item" key={`${item}${index}`}>
                            {item}
                        </li>
                    )}
                </ul>
            </div>
            :
            <div className='profile--guest'>

            </div>
        }
        </>
    )
}

export default NavProfile
