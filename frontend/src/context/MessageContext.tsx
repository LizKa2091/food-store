import React, { FC, ReactNode, createContext, useState, useContext } from 'react';

interface IMessageContextType {
   message: string;
   setMessage: (msg: string) => void;
};

const MessageContext = createContext<IMessageContextType | undefined>(undefined);

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

   if (!context) throw new Error('useMessage должен быть использован внутри MessageProvider');
   return context;
};

export { MessageContext, MessageProvider, useMessage };