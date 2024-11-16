import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { api, getUser } from "../auth/isLogin";
import useLogout from "../hooks/useLogout";

const Header = () => {
    const { Logout, loading } = useLogout();
    const navigate = useNavigate();
    const sideRef = useRef(null);
    const settingRef = useRef(null);
    const notificationRef = useRef(null);
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [isOpen, setisOpen] = useState(false);
    const [isOpenSetting, setisOpenSetting] = useState(false);
    const OpenSidebar = () => {
        sideRef.current.classList.toggle("mobile-menu");
        setisOpen(!isOpen);
    };
    const goHome = () => {
        navigate("/");
    };
    const OpenSettings = () => {
        settingRef.current.classList.toggle("mobile-nav");
        setisOpenSetting(!isOpenSetting);
    };
    const openNotification = () => {
        notificationRef.current.classList.toggle("notification-container");
    };
    const fetchNotification = async () => {
        try {
            setLoading(true);
            const request = await fetch(
                `${api}/user/get-user/${getUser().id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        minifacebook: getUser().token || null
                    }
                }
            );
            const response = await request.json();
            setLoading(false);
            if (response.notifications) {
                setNotifications(response.notifications);
            }
        } catch (error) {
            setLoading(false);
            console.log(
                "Error While Fetching Notification Client Side --> ",
                error.message
            );
        }
    };
    useEffect(() => {
        fetchNotification();
        if (isLoading) return;
    }, [getUser]);

    return (
        <>
            <header>
                <div className="logo">
                    <img
                        onClick={goHome}
                        src="/favicons/mini-facebook-header.png"
                    />
                    {/* <h3>Chat-App</h3>*/}
                </div>
                <div ref={settingRef} id="nav" className="links">
                    <NavLink to="/">
                        {/*<i className="bi bi-house"></i>*/}
                        <img id="icon--" src="/icons/home.png" />
                    </NavLink>
                    <NavLink to={`/profile/${getUser().name}/${getUser().id}`}>
                        {/*<i className="bi bi-person"></i>*/}
                        <img id="icon--" src="/icons/profile.png" />
                    </NavLink>
                    <NavLink to="/add-friend">
                        {/*<i className="bi bi-people"></i>*/}
                        <img id="icon--" src="/icons/peoples.png" />
                    </NavLink>
                    <NavLink to="#" onClick={OpenSidebar}>
                        {/*<i className="bi bi-chat"></i>*/}
                        <img id="icon--" src="/icons/friends.png" />
                    </NavLink>
                    <NavLink to="#">
                        {/*<i className="bi bi-box-arrow-right"></i>*/}
                        <img id="icon--" src="/icons/setting-2.png" />
                    </NavLink>
                    <NavLink
                        to="#"
                        onClick={e => {
                            e.preventDefault();
                            Logout();
                        }}
                    >
                        <img id="icon--" src="/icons/power.png" />
                    </NavLink>
                </div>
                <div className="action">
                    <button onClick={openNotification}>
                        <img id="icon--" src="/icons/bell.png" />
                        {notifications.length !== 0 && (
                            <span className="noti-count">
                                {notifications.length}
                            </span>
                        )}
                    </button>
                    <button>
                        <img id="icon--" src="/icons/chat.png" />
                        <span className="msg-count">5</span>
                    </button>
                    <button onClick={OpenSettings} className="settings">
                        {isOpenSetting ? (
                            <img id="icon--" src="/icons/close-x.png" />
                        ) : (
                            <img
                                id="icon--"
                                src="/icons/main-two.png"
                                width="28"
                                height="28"
                            />
                        )}
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
            <div ref={notificationRef} className="noti">
                <h3>Notifications</h3>
                <div className="container">
                    {!isLoading &&
                        notifications.length > 0 &&
                        notifications.map((notification, index) => {
                            return (
                                <div
                                    key={index + 123}
                                    id={notification?.sender_id}
                                    className="flex"
                                >
                                    <NavLink
                                        to="/"
                                        onClick={e => {
                                            e.preventDefault();
                                            openNotification();
                                            navigate(
                                                `/profile/${notification?.sender_name}/${notification?.sender_id}`
                                            );
                                        }}
                                    >
                                        <img
                                            src={notification?.sender_avatar}
                                        />
                                        <div className="row">
                                            <span>
                                                {notification?.sender_name}
                                            </span>
                                            <small>
                                                Sent You A Friend Request
                                            </small>
                                        </div>
                                    </NavLink>
                                    <button>Accept</button>
                                </div>
                            );
                        })}
                    {notifications.length === 0 && (
                        <div className="flex">
                            <h4>No Notification Yet</h4>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Header;
