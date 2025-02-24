import React, { createContext, useState, FC, ReactNode } from 'react';

interface IAuthContext {
    isAuthed: boolean;
    login: () => void;
    logout: () => void;
};

const AuthContext = createContext<IAuthContext | undefined>(undefined);

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthed, setIsAuthed] = useState<boolean>(false);
    const login = () => setIsAuthed(true);
    const logout = () => setIsAuthed(false);

    return (
        <AuthContext.Provider value={{ isAuthed, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };