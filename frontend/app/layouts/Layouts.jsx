import React, { useState, useEffect } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

// Imported The Bootsrtrap Icons
import "../styles/vendor/bootstrap/css/bootstrap.min.css";
import "../styles/vendor/bootstrap-icons/bootstrap-icons.css";
import "../styles/vendor/boxicons/css/boxicons.min.css";
import "../styles/vendor/remixicon/remixicon.css";
// Imported The CSS Styles Files
import "../styles/chat-ui.css";
import "../styles/home.css";
import "../styles/fetching.css";
import { useAuth } from "../contexts/useUserContext";

const Layouts = () => {
    const { isLogin } = useAuth();

    
    /*
    return (
        <>
            <div class="app">
                <Header />
                <main>
                    <Outlet />
                </main>
            </div>
        </>
    );
*/

    return (
        <>
            {isLogin ? (
                <div class="app">
                    <Header />
                    <main>
                        <Outlet />
                    </main>
                    {/* <Footer /> */}
                </div>
            ) : (
                <Navigate to="/login" />
            )}
        </>
    );
};

export default Layouts;
