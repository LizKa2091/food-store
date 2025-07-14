import React, { createContext, useState, useEffect, FC, ReactNode } from 'react';
import { logout, postCode, verifyUser } from '../services/authService';

interface IAuthContext {
   isAuthed: boolean;
   loginUser: (phoneNumber: string, code: string) => Promise<void>;
   logoutUser: () => Promise<void>;
};

const AuthContext = createContext<IAuthContext | undefined>(undefined);

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
   const [isAuthed, setIsAuthed] = useState<boolean>(false);

   useEffect(() => {
      const verifyToken = async (): Promise<void> => {
         const token = localStorage.getItem('token');

         if (token) {
            try {
               const result = await verifyUser(token);

               if (result?.isAuthenticated) {
                  setIsAuthed(true);
               }
               else {
                  setIsAuthed(false);
               }
            }
            catch (e) {
               console.error(e);
               setIsAuthed(false);
            }
         }
      };

      verifyToken();
   }, []);

   const loginUser = async (phoneNumber: string, code: string) => {
      let result;
      try {
         result = await postCode(phoneNumber, code);

         if (result.token) {
            localStorage.setItem('token', result.token);
            setIsAuthed(true);
         }
      }
      catch (e) {
         console.error(e);
         return e;
      }
      return result;
   };

   const logoutUser = async () => {
      try {
         const token = localStorage.getItem('token');
         if (token) {
            await logout(token);
            localStorage.removeItem('token');
            setIsAuthed(false);
         }
      } 
      catch (error) {
         console.error(error);
         throw new Error('Не удалось выйти из системы.');
      }
   };

   return (
      <AuthContext.Provider value={{ isAuthed, loginUser, logoutUser }}>
         {children}
      </AuthContext.Provider>
   );
};

export { AuthContext, AuthProvider };