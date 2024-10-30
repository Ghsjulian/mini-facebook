import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";

const AddFriends = () => {
    const [peoples, setPeople] = useState([]);
    const fetchPeoples = async () => {
        const api = import.meta.env.VITE_API_URL;
        try {
            const request = await fetch(`${api}/all-users`);
            const response = await request.json();
            setPeople(response.peoples);
            // alert(JSON.stringify(response));
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchPeoples();
    }, []);

    return (
        <div className="profile-section people">
            <h3>Add New Friend</h3>
            <div className="flex">
                <NavLink to="/profile">
                    <img src="images/girl.png" />
                    <span>Ghs Julian</span>
                </NavLink>
                <button className="add">Add Friend</button>
            </div>

            {/*
            <div className="flex">
                <NavLink to="/profile">
                    <img src="images/girl.png" />
                    <span>Ghs Julian</span>
                </NavLink>
                <button className="add">Add Friend</button>
            </div>
            <div className="flex">
                <NavLink to="/profile">
                    <img src="images/girl.png" />
                    <span>Ghs Julian</span>
                </NavLink>
                <button className="add">Add Friend</button>
            </div>
            <div className="flex">
                <NavLink to="/profile">
                    <img src="images/girl.png" />
                    <span>Ghs Julian</span>
                </NavLink>
                <button className="add">Add Friend</button>
            </div>
            <div className="flex">
                <NavLink to="/profile">
                    <img src="images/girl.png" />
                    <span>Ghs Julian</span>
                </NavLink>
                <button className="add">Add Friend</button>
            </div>
            <div className="flex">
                <NavLink to="/profile">
                    <img src="images/girl.png" />
                    <span>Ghs Julian</span>
                </NavLink>
                <button className="add">Add Friend</button>
            </div>
            <div className="flex">
                <NavLink to="/profile">
                    <img src="images/girl.png" />
                    <span>Ghs Julian</span>
                </NavLink>
                <button className="add">Add Friend</button>
            </div>
            <div className="flex">
                <NavLink to="/profile">
                    <img src="images/girl.png" />
                    <span>Ghs Julian</span>
                </NavLink>
                <button className="add">Add Friend</button>
            </div>
            <div className="flex">
                <NavLink to="/profile">
                    <img src="images/girl.png" />
                    <span>Ghs Julian</span>
                </NavLink>
                <button className="add">Add Friend</button>
            </div>
            <div className="flex">
                <NavLink to="/profile">
                    <img src="images/girl.png" />
                    <span>Ghs Julian</span>
                </NavLink>
                <button className="add">Add Friend</button>
            </div>
            */}
        </div>
    );
};

export default AddFriends;
