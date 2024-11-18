import React, { useState, useEffect, useRef } from "react";
import {
    NavLink,
    
    useLocation,
    useNavigate
} from "react-router-dom";
import { api, getUser } from "../auth/isLogin";

const Sidebar = ({ sidebar }) => {
    const [friends, setFriends] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    const fetchAllFriends = async () => {
        try {
            setLoading(true);
            const request = await fetch(`${api}/user/get-all-friends`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    minifacebook: getUser().token || null
                }
            });
            const response = await request.json();
            setLoading(false);
            //console.log("Friends---> ", response);
            setFriends(response);
        } catch (error) {
            setLoading(false);
            console.log(
                "Error While Fetching Notification Client Side --> ",
                error.message
            );
        }
    };
    useEffect(() => {
        fetchAllFriends();
        if (isLoading) return;
    }, []);

    return (
        <>
            <h3>Your Friends ({!isLoading && friends?.length})</h3>
            <div className="search-area">
                <input type="text" placeholder="Search..." />
                <button>
                    <i className="bi bi-search"></i>
                </button>
            </div>
            <div className="links">
                {!isLoading &&
                    friends?.length > 0 &&
                    friends?.map((friend, index) => {
                        return (
                            <div key={friend?.id} className="flex-friend">
                                <NavLink
                                    onClick={sidebar}
                                    to={`/profile/${friend.name}/${friend.id}`}
                                >
                                    <div className="active-circle">
                                        <img src={friend?.avatar} />
                                        <div className="active-user"></div>
                                    </div>
                                    <span>{friend?.name}</span>
                                </NavLink>
                                <button
                                    onClick={() => {
                                        navigate(
                                            `/chat-box/${friend?.name}/${friend?.id}`
                                        );
                                    }}
                                    className="send-msg"
                                >
                                    <img src="/icons/chat.png" />
                                </button>
                            </div>
                        );
                    })}

                <div className="flex-friend">
                    <NavLink to="/">
                        <div className="offline-circle">
                            <img src="/icons/girl.png" />
                            <div className="offline-user"></div>
                        </div>
                        <span>Sweata Sharma</span>
                    </NavLink>
                    <button className="send-msg">
                        <img src="/icons/chat.png" />
                    </button>
                </div>

                {/*
                <NavLink to="/login">
                    <img src="images/girl.png" />
                    <span>Login</span>
                </NavLink>
                <NavLink to="/signup">
                    <img src="images/girl.png" />
                    <span>Signup</span>
                </NavLink>
                <NavLink to="/profile">
                    <img src="images/girl.png" />
                    <span>Profile</span>
                </NavLink>
                <NavLink to="/">
                    <img src="images/girl.png" />
                    <span>Ghs Julian</span>
                </NavLink>
                <NavLink to="/">
                    <img src="images/girl.png" />
                    <span>Ghs Julian</span>
                </NavLink>
                <NavLink to="/">
                    <img src="images/girl.png" />
                    <span>Ghs Julian</span>
                </NavLink>
                <NavLink to="/">
                    <img src="images/girl.png" />
                    <span>Ghs Julian</span>
                </NavLink>
                <NavLink to="/">
                    <img src="images/girl.png" />
                    <span>Ghs Julian</span>
                </NavLink>
                <NavLink to="/">
                    <img src="images/girl.png" />
                    <span>Ghs Julian</span>
                </NavLink>
                <NavLink to="/">
                    <img src="images/girl.png" />
                    <span>Ghs Julian</span>
                </NavLink>
                <NavLink to="/">
                    <img src="images/girl.png" />
                    <span>Ghs Julian</span>
                </NavLink>
                <NavLink to="/">
                    <img src="images/girl.png" />
                    <span>Ghs Julian</span>
                </NavLink>
                <NavLink to="/">
                    <img src="images/girl.png" />
                    <span>Ghs Julian</span>
                </NavLink>
                <NavLink to="/">
                    <img src="images/girl.png" />
                    <span>Ghs Julian</span>
                </NavLink>
                <NavLink to="/">
                    <img src="images/girl.png" />
                    <span>Ghs Julian</span>
                </NavLink>
                <NavLink to="/">
                    <img src="images/girl.png" />
                    <span>Ghs Julian</span>
                </NavLink>
                <NavLink to="/">
                    <img src="images/girl.png" />
                    <span>Ghs Julian</span>
                </NavLink>
                <NavLink to="/">
                    <img src="images/girl.png" />
                    <span>Ghs Julian</span>
                </NavLink>
                <NavLink to="/">
                    <img src="images/girl.png" />
                    <span>Ghs Julian</span>
                </NavLink>
                <NavLink to="/">
                    <img src="images/girl.png" />
                    <span>Ghs Julian</span>
                </NavLink>
                <NavLink to="/">
                    <img src="images/girl.png" />
                    <span>Ghs Julian</span>
                </NavLink>
                <NavLink to="/">
                    <img src="images/girl.png" />
                    <span>Ghs Julian</span>
                </NavLink>
                
                */}
            </div>
        </>
    );
};

export default Sidebar;
