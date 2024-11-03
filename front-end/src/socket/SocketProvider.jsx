import React, { useEffect, useState, createContext, useContext } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../auth/Auth";
// Create a context for authentication
const AuthContext = createContext();

// Initialize the socket connection
const socket = io("http://localhost:3000", {
    transports: ["websocket"] // Ensure WebSocket transport is used
});

export const SocketProvider = ({ children }) => {
    const [activeUsers, setActiveUsers] = useState([]);
    const { getUser } = useAuth();
    useEffect(() => {
        socket.on("listening-notifications", data => {
            console.log(data);
            alert(data);
        });
        // Listen for connection errors
        socket.on("connect_error", err => {
            console.error(`Connection error: ${err.message}`);
        });
        // Cleanup on component unmount
        return () => {
            socket.off("connect_error");
        };
    }, []);

    // Function to create a connection for a user
    const connectUserToServer = userId => {
        socket.emit("new-user", getUser());
    };

    socket.on("active-users", users => {
        setActiveUsers(users);
    });

    const addFriend = async (id, target) => {
        try {
            const api = import.meta.env.VITE_API_URL;
            const request = await fetch(`${api}/add-friend/${id}`, {
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
            alert(error.message);
            console.log("Error On Logout : ", error.message);
        }
        /*
        //socket.emit("send-friend-request", getUser().id, id);
       // socket.on("request-sent", status => {
            if (status) {
                target.textContent = "Cancel";
                target.classList.remove("add");
                target.classList.add("show-cancel");
            }
        });
        */
    };

    return (
        <AuthContext.Provider value={{ connectUserToServer, addFriend }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the Socket context
export const useSocket = () => {
    return useContext(AuthContext);
};
