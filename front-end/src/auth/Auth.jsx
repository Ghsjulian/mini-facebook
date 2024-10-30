// src/auth/AuthContext.js
import React, { useEffect, createContext, useContext, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getCookie } from "./Cookies";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Change isLogin to be a state variable
    const [isLogin, setIsLogin] = useState(false); // Initially set to false or true based on your logic

    const isLoggedIn = () => {
        var data = {
            token: getCookie("mini-token") || null,
            id: getCookie("mini-id") || null,
            type: getCookie("mini-user") || null,
            date: getCookie("mini-date") || null
        };
        if (data.token !== null && data.id !== null) {
            return data;
        } else {
            return null;
        }
    };
    const isAuthenticated = () => {
        var data = {
            token: getCookie("mini-token") || null,
            id: getCookie("mini-id") || null,
            type: getCookie("mini-user") || null,
            date: getCookie("mini-date") || null
        };
        if (data.token !== null && data.id !== null) {
            return data;
        } else {
            return null;
        }
    };

    const login = () => {
        setIsLogin(true); // Call this function when user logs in
    };

    const logout = () => {
        setIsLogin(false); // Call this function when user logs out
    };

    return (
        <AuthContext.Provider
            value={{ isLogin, isLoggedIn, isAuthenticated, login, logout }}
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
