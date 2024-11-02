import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/Auth";
import { useSocket } from "../auth/SocketProvider";

const AddFriends = () => {
    const [peoples, setPeople] = useState([]);
    const { addFriend } = useSocket();
    const { getUser } = useAuth();
    const fetchPeoples = async () => {
        const api = import.meta.env.VITE_API_URL;
        try {
            const request = await fetch(`${api}/all-users/${getUser().id}`);
            const response = await request.json();
            if (response.success) {
                setPeople(response.peoples);
            }
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

            {peoples.length > 0 &&
                peoples.map((people, index) => {
                    return (
                        <div className="flex">
                            <NavLink to={`/profile?id=${people.id}`}>
                                <img src={people.avtar} />
                                <span>{people.name}</span>
                            </NavLink>
                            <button
                                onClick={e => {
                                    (e.target.textContent = "Adding"),
                                        addFriend(people.id, e.target);
                                }}
                                id={people.id}
                                className="add"
                            >
                                Add Friend
                            </button>
                        </div>
                    );
                })}

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
