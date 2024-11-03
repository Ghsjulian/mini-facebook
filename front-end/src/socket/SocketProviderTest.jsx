// src/SocketProvider.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();
const SOCKET_SERVER_URL = 'http://localhost:4000'; // Update this to your server URL

export const SocketProvider = ({ children }) => {
    const [socket] = useState(() => io(SOCKET_SERVER_URL));
    const [activeUsers, setActiveUsers] = useState([]);

    useEffect(() => {
        socket.on('activeUsers', (users) => {
            setActiveUsers(users);
        });

        return () => {
            socket.disconnect();
        };
    }, [socket]);

    const connectNewUser  = (userName) => {
        socket.emit('newUser ', userName);
    };

    const sendPrivateMessage = (recipientId, message) => {
        socket.emit('privateMessage', { recipientId, message });
    };

    return (
        <SocketContext.Provider value={{ activeUsers, connectNewUser , sendPrivateMessage }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    return useContext(SocketContext);
};