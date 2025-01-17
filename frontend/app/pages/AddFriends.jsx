import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import useFindFriend from "../hooks/useFindFriend";
import useAddFriend from "../hooks/useAddFriend";
import PeopleFetching from "../skeletons/PeopleFetching";

const AddFriends = () => {
    const { getUser, api } = useAuth();
    const { isFetching, peoples, FindPeoples } = useFindFriend();
    const { result, AddFriend } = useAddFriend();
    // Local state to track friend request status
    const [friendRequests, setFriendRequests] = useState({});
    const [adding, setAdding] = useState(false);
    const [me, setMe] = useState(false);

    const getMe = async user => {
        try {
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
            if (response) {
                setMe(response);
            }
        } catch (error) {
            console.error(
                "Error in Profile.jsx Fetching User --> ",
                error.message
            );
        }
    };

    useEffect(() => {
        FindPeoples();
        getMe();
        if (isFetching) return;
    }, []);

    const isRequested = people => {
        if (people.requests.includes(getUser().id)) {
            return true;
        } else {
            return false;
        }
    };
    const isRequestedMe = id => {
        if (me.length > 0) {
            console.log(me);
        }
    };

    const handleAddFriend = async (people, id) => {
        const btn = document.getElementById(id);
        try {
            setAdding(true);
            await AddFriend(id);
            const request = await fetch(`${api}/user/get-user/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    minifacebook: getUser().token || null
                }
            });
            const response = await request.json();
            btn.setAttribute("class", "");
            setAdding(false);
            if (isRequested(response)) {
                btn.classList.add("show-cancel");
                btn.textContent = "Cancel Request";
            } else {
                btn.classList.add("add");
                btn.textContent = "Add Friend";
            }
        } catch (error) {
            console.error(
                "Error Fetching User In Client Side Add-Friend --> ",
                error.message
            );
            setAdding(false);
        } finally {
            setAdding(false);
        }
    };

    const AcceptRequest = async id => {
        try {
            const request = await fetch(
                `${api}/user/accept-friend-request/${id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        minifacebook: getUser().token || null
                    }
                }
            );
            const response = await request.json();
            getMe();
        } catch (error) {
            console.log(error);
        }
    };
    const isFriend = (me, target) => {
        if (me?.friends?.length > 0) {
            let result = me?.friends?.find(obj => obj.id === target);
            if (result?.id) {
                if (result?.id === target) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    };
    return (
        <div className="profile-section people">
            <h3>Add New Friend</h3>
            {isFetching && <PeopleFetching />}

            {!isFetching &&
                peoples &&
                peoples.length > 0 &&
                peoples.map((people, index) => {
                    const requestStatus = friendRequests[people._id];
                    return (
                        <>
                            {!isFriend(me, people._id) && (
                                <div key={people._id+index+123} className="flex">
                                    <NavLink
                                        to={`/profile/${people.name}/${people._id}`}
                                    >
                                        <img
                                            src={
                                                people.avatar
                                                    ? people.avatar
                                                    : "/icons/man.png"
                                            }
                                            alt={people.name}
                                        />
                                        <span>{people.name}</span>
                                    </NavLink>
                                    {!isFriend(me, people._id) && (
                                        <button
                                            onClick={e => {
                                                e.preventDefault();
                                                handleAddFriend(
                                                    people,
                                                    people._id
                                                );
                                            }}
                                            id={people._id}
                                            className="add"
                                        >
                                            Add Friend
                                        </button>
                                    )}
                                    {people.is_requested && (
                                        <button
                                            onClick={e => {
                                                e.preventDefault();
                                                handleAddFriend(
                                                    people,
                                                    people._id
                                                );
                                            }}
                                            id={people._id}
                                            className="show-cancel"
                                        >
                                            Cancel Request
                                        </button>
                                    )}
                                </div>
                            )}
                        </>
                    );
                })}
        </div>
    );
};

export default AddFriends;
