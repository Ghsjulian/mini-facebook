import React, { useEffect, createContext, useContext } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./Auth";
// Create a context for authentication
const AuthContext = createContext();

// Initialize the socket connection
const socket = io("http://localhost:3000", {
    transports: ["websocket"] // Ensure WebSocket transport is used
});

export const SocketProvider = ({ children }) => {
    const { getUser } = useAuth();
    useEffect(() => {
        socket.on("get-new-user",(users)=>{
            console.log(users);
        })
        // Listen for connection errors
        socket.on("connect_error", err => {
            console.error(`Connection error: ${err.message}`);
        });

        // Listen for the __init__ event from the server
        socket.on("__init__", id => {
            console.log(`Initialized with connection ID: ${id}`);
        });

        // Cleanup on component unmount
        return () => {
            socket.off("__init__");
            socket.off("connect_error");
        };
    }, []);

    // Function to create a connection for a user
    const connectUserToServer = userId => {
        socket.emit("new-user", userId);
    };

    const addFriend = async (id, target) => {
        socket.emit("add-friend", getUser().id, id);
        socket.on("request-sent", status => {
            if (status) {
                target.textContent = "Cancel";
                target.classList.remove("add");
                target.classList.add("show-cancel");
                
            }
        });
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
