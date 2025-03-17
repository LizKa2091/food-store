import React, { FC, ReactNode, createContext, useState, useContext } from 'react';

interface MessageContextType {
    message: string;
    setMessage: (msg: string) => void;
};

const MessageContext = createContext<MessageContextType | undefined>(undefined);

const MessageProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [message, setMessage] = useState<string>('');
    return (
        <MessageContext.Provider value={{ message, setMessage }}>
            {children}
        </MessageContext.Provider>
    );
};

const useMessage = () => {
    const context = useContext(MessageContext);
    if (context === undefined) {
        throw new Error('useMessage должен быть использован внутри MessageProvider');
    }
    return context;
};

export { MessageContext, MessageProvider, useMessage };