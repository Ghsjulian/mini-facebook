// src/auth/AuthContext.js
import React, { useEffect, createContext, useContext, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getCookie } from "./Cookies";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false); // Initially set to false or true based on your logic
    const isLoggedIn = () => {
        var isUser = getCookie("mini-facebook") || null;
        if (isUser && isUser !== null) {
            return true;
        } else {
            return false;
        }
    };
    const isAuthenticated = () => {
        var isUser = getCookie("mini-facebook") || null;
        if (isUser && isUser !== null) {
            return true;
        } else {
            return false;
        }
    };
    const getUser = () => {
        var isUser = getCookie("mini-facebook") || null;
        if (isUser && isUser !== null) {
            return JSON.parse(isUser);
        } else {
            return null;
        }
    };
    const logout = async () => {
        try {
            const api = import.meta.env.VITE_API_URL;
            const request = fetch(`${api}/logout`, {
                headers: {
                    "Content-Type": "application/json",
                    user: getUser()?.token || null
                },
                method: "GET"
            });
            const response = await request.json();
            console.log(response);
        } catch (error) {
            console.log("Error On Logout : ", error.message);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                isLogin,
                isLoggedIn,
                getUser,
                isAuthenticated,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export const Protect = ({ children }) => {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated()) {
        return <Navigate to="/login" />;
    }
   return isAuthenticated() ? children : <Navigate to="/login" />;
};
export const LoginProtect = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return !isAuthenticated() ? children : <Navigate to="/" />;
};

/*
//src/auth/AuthContext.js
import React, { createContext, useContext, useState } from "react";
import { Navigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const isLogin = true;
    const isAuthenticated = () => {
        return isLogin;
    };
    return (
        <AuthContext.Provider
            value={{ isLogin, isAuthenticated }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export const Protect = ({ children }) => {
    const { isLogin, isAuthenticated } = useAuth();
    return isAuthenticated() ? children : <Navigate to="/login" />;
};
*/
