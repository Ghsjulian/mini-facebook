import React, { useEffect, useState, createContext, useContext } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../auth/Auth";
// Create a context for authentication
const AuthContext = createContext();

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [activeUsers, setActiveUsers] = useState([]);
    const { getUser } = useAuth();
    useEffect(() => {
        if (getUser()?.id) {
            const socket = io("http://localhost:3000", {
                transports: ["websocket"]
            });
            setSocket(socket);
            socket.emit("connect-user", getUser());
            socket.on("active-users", users => {
                setActiveUsers(users);
            });

            // Get Notifications
        } else {
            return () => {
                setSocket(null);
            };
        }
    }, []);

    const addFriend = async (userid, target) => {
        try {
            const api = import.meta.env.VITE_API_URL;
            const request = await fetch(`${api}/add-friend/${userid}`, {
                headers: {
                    "Content-Type": "application/json",
                    user: getUser()?.token || null
                }
            });
            const response = await request.json();
            if (response.success) {
                target.textContent = "Cancel";
                target.classList.remove("add");
                target.classList.add("show-cancel");
            }
        } catch (error) {
            console.log("Error On Logout : ", error.message);
        }
    };
    const getNotification = async () => {
        try {
            const api = import.meta.env.VITE_API_URL;
            const request = await fetch(
                `${api}/get-notification/${getUser()?.id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        user: getUser()?.token || null
                    }
                }
            );
            const response = await request.json();
            console.log(response);
        } catch (error) {
            console.log(error.message);
            console.log("Error On Logout : ", error.message);
        }
    };

    return (
        <AuthContext.Provider
            value={{ socket, activeUsers, addFriend, getNotification }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the Socket context
export const useSocket = () => {
    return useContext(AuthContext);
};
