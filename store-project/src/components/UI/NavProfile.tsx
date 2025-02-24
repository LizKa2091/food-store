import React, { FC, useContext } from 'react';
import './NavProfile.scss';
import { AuthContext } from '../../context/AuthContext';

const NavProfile: FC = () => {
    const login = useContext(AuthContext);
    console.log(login);

    return (
        <div className='nav__profile'>

        </div>
    )
}

export default NavProfile
