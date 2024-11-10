import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <>
            <h3>Your Friends</h3>
            <div className="search-area">
                <input type="text" placeholder="Search..." />
                <button>
                    <i className="bi bi-search"></i>
                </button>
            </div>
            <div className="links">
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
            </div>
        </>
    );
};

export default Sidebar;
