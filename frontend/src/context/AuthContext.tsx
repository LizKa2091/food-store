import React, { createContext, useState, FC, ReactNode } from 'react';

interface IAuthContext {
    isAuthed: boolean;
    login: () => void;
    logout: () => void;
};

const postPhoneNum = async (phoneNumber: string) => {
    try {
        const response = await fetch('http://localhost:5001/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phoneNumber })
        });

        if (!response.ok) {
            throw new Error(`http ошибка ${response.status}`);
        }

        let result = await response.json();
        return result;
    }
    catch (e) {
        throw new Error(`ошибка запроса: ${e}`);
    }
};

const postCode = async (phoneNumber: string, code: string) => {
    try {
        const response = await fetch('http://localhost:5001/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phoneNumber, code })
        });

        let result = await response.json();
        return result;
    }
    catch (e) {
        throw new Error(`ошибка запроса: ${e}`);
    }
};

const verifyUser = async (token: string) => {
    try {
        const response = await fetch('http://localhost:5001/status', {
            method: 'GET',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error(`http ошибка: ${response.status}`);
        }

        let result = await response.json();
        return result;
    }
    catch (e) {
        throw new Error(`ошибка запроса: ${e}`);
    }
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

export { AuthContext, AuthProvider, postPhoneNum, postCode, verifyUser };