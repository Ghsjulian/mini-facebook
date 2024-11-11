import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getUser, api } from "../auth/isLogin";
import useFindFriend from "../hooks/useFindFriend";
import useAddFriend from "../hooks/useAddFriend";
import PeopleFetching from "../skeletons/PeopleFetching";

const AddFriends = () => {
    const { isFetching, peoples, FindPeoples } = useFindFriend();
    const { result, AddFriend } = useAddFriend();
    // Local state to track friend request status
    const [friendRequests, setFriendRequests] = useState({});
    const [adding, setAdding] = useState(false);

    useEffect(() => {
        FindPeoples();
        if (isFetching) return;
    }, []);

    const isRequested = people => {
        if (people.requests.includes(getUser().id)) {
            return true;
        } else {
            return false;
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
            if (!request.ok) {
                throw new Error("Network response was not ok");
            }
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
        /*
        // Call the AddFriend function
        await AddFriend(id);
        if (user !== null) {
            console.log(user);
            // alert(JSON.stringify(user));
            //btn.textContent = "Cancel Request"
            // btn.classList.add("show-cancel")
            // btn.classList.add("show-cancel")
        }

        // Update the local state to reflect the friend request status
        setFriendRequests(prev => ({
            ...prev,
            [id]: "pending" // or 'added' based on your logic
        }));
        */
    };

    return (
        <div className="profile-section people">
            <h3>Add New Friend</h3>
            {isFetching && <PeopleFetching />}

            {!isFetching &&
                peoples &&
                peoples.length > 0 &&
                peoples.map(people => {
                    const requestStatus = friendRequests[people._id];
                    return (
                        <div key={people._id + "__123"} className="flex">
                            <NavLink
                                to={`/profile/${people.name}/${people._id}`}
                            >
                                <img
                                    src={
                                        people.avtar
                                            ? people.avtar
                                            : "icons/man.png"
                                    }
                                    alt={people.name}
                                />
                                <span>{people.name}</span>
                            </NavLink>
                            <button
                                onClick={e => {
                                    e.preventDefault();
                                    handleAddFriend(people, people._id);
                                }}
                                id={people._id}
                                className={
                                    people.is_requested ? "show-cancel" : "add"
                                }
                            >
                                {people.is_requested
                                    ? "Cancel Request"
                                    : "Add Friend"}
                            </button>
                        </div>
                    );
                })}
        </div>
    );
};

export default AddFriends;

/*
import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getUser } from "../auth/isLogin";
import useFindFriend from "../hooks/useFindFriend";
import useAddFriend from "../hooks/useAddFriend";
import PeopleFetching from "../skeletons/PeopleFetching";

const AddFriends = () => {
    const { isFetching, peoples, FindPeoples } = useFindFriend();
    const { adding, result, AddFriend } = useAddFriend();

    useEffect(() => {
        FindPeoples();
        if (isFetching) return;
    }, []);
    return (
        <div className="profile-section people">
            <h3>Add New Friend</h3>
            {isFetching && <PeopleFetching />}

            {!isFetching &&
                peoples !== null &&
                peoples.length > 0 &&
                peoples.map((people, index) => {
                    return (
                        <div key={people._id} className="flex">
                            <NavLink
                                to={`/profile/${people.name}/${people._id}`}
                            >
                                <img
                                    src={
                                        people.avtar
                                            ? people.avtar
                                            : "icons/man.png"
                                    }
                                />
                                <span>{people.name}</span>
                            </NavLink>
                            <button
                                onClick={e => {
                                    e.preventDefault();
                                    AddFriend(people._id);
                                }}
                                id={people._id}
                                className={"add"}
                            >
                                Add Friend
                            </button>
                        </div>
                    );
                })}
        </div>
    );
};

export default AddFriends;
*/
