import React, { FC, useContext, useState, useEffect, useDebugValue } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useMessage } from '../../context/MessageContext';
import ProfilePage from '../ProfilePage';

const ProtectedProfile = () => {
  const currAuthContext = useContext(AuthContext);
  const isAuthed = currAuthContext?.isAuthed || false;
  
  const { setMessage } = useMessage();

  useEffect(() => {
   if (!isAuthed) {
      setMessage('Пожалуйста, авторизуйтесь');
   }
  }, [isAuthed]);

  return (
      isAuthed ? (
         <ProfilePage />
      ) : (
         <Navigate to='/' />
      )
  )
};

export default ProtectedProfile;