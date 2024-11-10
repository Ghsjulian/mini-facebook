import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import Sidebar from "./Sidebar";
import { getUser } from "../auth/isLogin";
import useLogout from "../hooks/useLogout";

const Header = () => {
    const { Logout, loading } = useLogout();
    const sideRef = useRef(null);
    const settingRef = useRef(null);
    const [isOpen, setisOpen] = useState(false);
    const [isOpenSetting, setisOpenSetting] = useState(false);
    const OpenSidebar = () => {
        sideRef.current.classList.toggle("mobile-menu");
        setisOpen(!isOpen);
    };
    const OpenSettings = () => {
        settingRef.current.classList.toggle("mobile-nav");
        setisOpenSetting(!isOpenSetting);
    };

    return (
        <>
            <header>
                <div className="logo">
                    <img src="favicons/mini-facebook-header.png" />
                    {/* <h3>Chat-App</h3>*/}
                </div>
                <div ref={settingRef} id="nav" className="links">
                    <NavLink to="/">
                        {/*<i className="bi bi-house"></i>*/}
                        <img id="icon--" src="icons/home.png" />
                    </NavLink>
                    <NavLink to={`/profile/${getUser().name}/${getUser().id}`}>
                        {/*<i className="bi bi-person"></i>*/}
                        <img id="icon--" src="icons/user-one.png" />
                    </NavLink>
                    <NavLink to="/add-friend">
                        {/*<i className="bi bi-people"></i>*/}
                        <img id="icon--" src="icons/friends.png" />
                    </NavLink>
                    <NavLink to="/chat">
                        {/*<i className="bi bi-chat"></i>*/}
                        <img id="icon--" src="icons/chat.png" />
                    </NavLink>
                    <NavLink to="#">
                        {/*<i className="bi bi-box-arrow-right"></i>*/}
                        <img id="icon--" src="icons/settings.png" />
                    </NavLink>
                    <NavLink
                        to="#"
                        onClick={e => {
                            e.preventDefault();
                            Logout();
                        }}
                    >
                        {/*<i className="bi bi-box-arrow-right"></i>*/}
                        <img id="icon--" src="icons/logout.png" />
                    </NavLink>
                </div>
                <div className="action">
                    <button>
                        {/*<i className="bi bi-bell"></i>*/}
                        <img id="icon--" src="icons/bell.png" />
                    </button>
                    <button onClick={OpenSidebar} className="nav-btn">
                        {/*<i
                            id="side-bar"
                            className={
                                isOpen ? "bi-x" : "bi bi-layout-text-sidebar"
                            }
                        ></i>*/}
                        <img id="icon--" src="icons/peoples.png" />
                    </button>
                    <button onClick={OpenSettings} className="settings">
                        <i
                            id="settings"
                            className={isOpenSetting ? "bi-x" : "bi bi-justify"}
                        ></i>
                    </button>
                </div>
            </header>
            <aside ref={sideRef}>
                <Sidebar />
            </aside>
            <div
                onClick={OpenSidebar}
                className={isOpen ? "overly-active" : "overly"}
            ></div>
        </>
    );
};

export default Header;
