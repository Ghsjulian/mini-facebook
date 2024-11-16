import React, {
    createContext,
    useContext,
    useReducer,
    useEffect,
    useState
} from "react";
import { Navigate } from "react-router-dom";
import useCookie from "../hooks/useCookie";
export const api = import.meta.env.VITE_API_URL;

const getUser = () => {
    const { getCookie } = useCookie();
    const cookie = getCookie("minifacebook") || null;
    if (cookie !== null) {
        const data = JSON.parse(cookie) || null;
        if (data !== null && data.token) {
            return data;
        } else {
            return false;
        }
    } else {
        return false;
    }
};
const isLogged = () => {
    const { getCookie } = useCookie();
    const cookie = getCookie("minifacebook") || null;
    if (cookie !== null) {
        const data = JSON.parse(cookie) || null;
        if (data !== null && data.token) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
};

// Initial state
const initialState = {
    isLogin: isLogged() || false,
    user: getUser() || null
};
// Action types
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

// Reducer function
const authReducer = (state, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isLogin: true,
                user: action.payload
            };
        case LOGOUT:
            return {
                ...state,
                isLogin: false,
                user: null
            };
        default:
            return state;
    }
};

// Create context
const AuthContext = createContext();

// Custom hook
export const useAuth = () => {
    return useContext(AuthContext);
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const isLogin = state.isLogin;

    const login = userDetails => {
        dispatch({ type: LOGIN, payload: userDetails });
    };

    const logout = () => {
        dispatch({ type: LOGOUT });
    };

    const authUser = () => {
        return state.user;
    };

    return (
        <AuthContext.Provider
            value={{ state, login, logout, authUser, isLogin }}
        >
            {children}
        </AuthContext.Provider>
    );
};


/*
const UserContext = createContext();
export const UserProvider = ({ children }) => {
    
    return <UserContext.Provider value={{}}>{children}</UserContext.Provider>;
};

export const useUser = () => {
    return useContext(UserContext);
};
*/
