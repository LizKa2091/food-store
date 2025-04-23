import React, { useState, FC, ReactNode } from 'react';

// interface IAuthContext {
//     isAuthed: boolean;

// };

// const CartContext = createContext<IAuthContext | undefined>(undefined);

// const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
//     const [isAuthed, setIsAuthed] = useState<boolean>(false);
//     const loginUser = () => setIsAuthed(true);
//     const logoutUser = () => setIsAuthed(false);

//     return (
//         <AuthContext.Provider value={{ isAuthed, loginUser, logoutUser }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export { AuthContext, AuthProvider };