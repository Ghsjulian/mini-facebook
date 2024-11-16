import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/useUserContext";

const IsLogged = () => {
    const { isLogin } = useAuth();
    return <>{!isLogin &&<Outlet />}</>;
};

export default IsLogged;
