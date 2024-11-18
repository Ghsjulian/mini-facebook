import React, { createContext, useContext, useState } from 'react';
import {useSocketContext} from "./SocketContext"
const MessageContext = createContext();

export const useMessage = () => {
    return useContext(MessageContext);
};

export const MessageProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const {socket} = useSocketContext()
    const addMessage = (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    };
socket?.on("new_message", newMessage => {
                addMessage(newMessage)
            });
    return (
        <MessageContext.Provider value={{ messages, setMessages, addMessage }}>
            {children}
        </MessageContext.Provider>
    );
};