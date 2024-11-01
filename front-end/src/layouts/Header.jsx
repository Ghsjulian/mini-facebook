import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import Sidebar from "./Sidebar";

const Header = () => {
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
                    <h3>Chat-App</h3>
                </div>
                <div ref={settingRef} id="nav" className="links">
                    <NavLink to="/">
                        <i className="bi bi-house"></i>
                    </NavLink>
                    <NavLink to="/profile">
                        <i className="bi bi-person"></i>
                    </NavLink>
                    <NavLink to="/add-friends">
                        <i className="bi bi-people"></i>
                    </NavLink>
                    <NavLink to="/chat">
                        <i className="bi bi-chat"></i>
                    </NavLink>
                    <NavLink to="/">
                        <i className="bi bi-box-arrow-right"></i>
                    </NavLink>
                </div>
                <div className="action">
                    <button>
                        <i className="bi bi-bell"></i>
                    </button>
                    <button onClick={OpenSidebar} className="nav-btn">
                        <i
                            id="side-bar"
                            className={
                                isOpen ? "bi-x" : "bi bi-layout-text-sidebar"
                            }
                        ></i>
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
