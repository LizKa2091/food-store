import React, { FC, useContext, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useMessage } from '../../context/MessageContext';
import ProfilePage from '../ProfilePage/ProfilePage';

const ProtectedProfile: FC = () => {
  const currAuthContext = useContext(AuthContext);
  const isAuthed = currAuthContext?.isAuthed || false;
  
  const { setMessage } = useMessage();
  const { section } = useParams();

  useEffect(() => {
   if (!isAuthed) {
      setMessage('Пожалуйста, авторизуйтесь');
   }
  }, [isAuthed]);

  return (
      isAuthed ? (
         <ProfilePage section={section || 'Личные данные'}/>
      ) : (
         <Navigate to='/' />
      )
  )
};

export default ProtectedProfile;