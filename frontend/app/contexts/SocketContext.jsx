import { createContext, useState, useEffect, useContext } from "react";
import { getUser } from "../auth/isLogin";
import io from "socket.io-client";

const SocketContext = createContext();
const sock_url = import.meta.env.VITE_SOCK_URL;

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [activeUsers, setActiveUsers] = useState([]);

    useEffect(() => {
        if (getUser().id) {
            const socket = io(sock_url, {
                query: {
                    user_id: getUser().id
                }
            });
            setSocket(socket);
            socket.on("active_users", users => {
                setActiveUsers(users);
            });

            return () => socket.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, []);

    return (
        <SocketContext.Provider value={{ socket, activeUsers }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocketContext = () => {
    return useContext(SocketContext);
};
