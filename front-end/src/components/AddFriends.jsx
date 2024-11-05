import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/Auth";
import { useSocket } from "../socket/SocketProvider";

const AddFriends = () => {
    const [peoples, setPeople] = useState([]);
    const { addFriend, activeUsers } = useSocket();
    const { getUser } = useAuth();
    const fetchPeoples = async () => {
        const api = import.meta.env.VITE_API_URL;
        try {
            const request = await fetch(
                `${api}/find-peoples/${getUser()?.id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        user: getUser()?.token || null
                    }
                }
            );
            const response = await request.json();
            if (response.success) {
                setPeople(response.peoples);
            }
        } catch (error) {
            //  alert(JSON.stringify(error.message));
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
                        <div key={people._id} className="flex">
                            <NavLink to={`/profile?id=${people._id}`}>
                                <img src={people.avtar} />
                                <span>{people.name}</span>
                            </NavLink>
                            <button
                                onClick={e => {
                                    (e.target.textContent = "Adding"),
                                        addFriend(
                                            people._id,
                                            e.target
                                        );
                                }}
                                id={people._id}
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
