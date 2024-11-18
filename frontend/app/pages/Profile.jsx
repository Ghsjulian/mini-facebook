import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, NavLink, Navigate } from "react-router-dom";
import FetchAllPost from "../components/FetchAllPost";
import CreatePost from "../components/CreatePost";
import { getUser, api } from "../auth/isLogin";
import useAddFriend from "../hooks/useAddFriend";
import { getDate } from "../hooks/useDate";
import { useAuth } from "../contexts/useUserContext";

const Profile = () => {
    const { authUser } = useAuth();
    const { adding, result, AddFriend } = useAddFriend();
    const { user_id, user_name } = useParams();
    const [getting, setGetting] = useState(false);
    const [user, setUser] = useState(null);
    const [me, setMe] = useState({});
    const navigate = useNavigate();
    const [name, setName] = useState(getUser().name);
    const [email, setEmail] = useState(getUser().email);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNePassword] = useState("");
    const mesgRef = useRef(null);
    // Profile And Cover Image
    const [profilePic, setProfilePic] = useState(null);
    const [coverPic, setCoverPic] = useState(null);
    const [profileData, setProfileData] = useState(null);
    const [coverData, setCoverData] = useState(null);

    const profileRef = useRef(null);
    const formRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const openEditForm = () => {
        formRef.current.style.display = "flex";
    };
    const closeEditForm = () => {
        formRef.current.style.display = "none";
    };

    const handleCoverImageChange = event => {
        const file = event.target.files[0];
        setCoverPic(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = result => {
                setCoverData(reader.result);
            };
            reader.readAsDataURL(file); // Read the file as a data URL
        }
    };

    const handleProfileImageChange = event => {
        const file = event.target.files[0];
        setProfilePic(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileData(reader.result);
            };
            reader.readAsDataURL(file); // Read the file as a data URL
        }
    };

    const showProfileMessage = (type, msg) => {
        if (type) {
            profileRef.current.classList.add("success-profile");
            profileRef.current.textContent = msg;
        } else {
            profileRef.current.classList.add("error-profile");
            profileRef.current.textContent = msg;
        }
        setTimeout(() => {
            profileRef.current.setAttribute("class", "");
            profileRef.current.textContent = "";
        }, 3000);
    };
    const showMessage = (type, msg) => {
        if (type) {
            mesgRef.current.classList.add("success");
            mesgRef.current.textContent = msg;
        } else {
            mesgRef.current.classList.add("error");
            mesgRef.current.textContent = msg;
        }
        setTimeout(() => {
            mesgRef.current.setAttribute("class", "");
            mesgRef.current.textContent = "";
        }, 3000);
    };

    const fetchUserProfile = async user_id => {
        try {
            setGetting(true);
            const request = await fetch(`${api}/user/get-user/${user_id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    minifacebook: getUser().token || null
                }
            });
            const response = await request.json();
            setUser(response);
            setGetting(false);
            document.title = "Profile Page - " + response.name;
        } catch (error) {
            console.error(
                "Error in Profile.jsx Fetching User --> ",
                error.message
            );
        } finally {
            setGetting(false);
        }
    };
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
            //  if (response.notifications.length > 0) {
            setMe(response);
            // }
        } catch (error) {
            console.error(
                "Error in Profile.jsx Fetching User --> ",
                error.message
            );
        }
    };

    const updateProfile = async () => {
        // Check if both images are null
        if (profilePic === null && coverPic === null) {
            showProfileMessage(false, "Select A Profile Or Cover Image");
            return;
        }

        // Create FormData object
        var formData = new FormData();

        // Check if profilePic is not null and append it
        if (profilePic !== null) {
            formData.append("profilePic", profilePic);
        }
        // Check if coverPic is not null and append it
        if (coverPic !== null) {
            formData.append("coverPic", coverPic);
        }
        let bodyData = {
            isCover: coverPic ? "YES" : "NO",
            isProfile: profilePic ? "YES" : "NO"
        };
        formData.append("images", JSON.stringify(bodyData));
        try {
            const response = await fetch(`${api}/user/edit-profile`, {
                method: "PUT",
                headers: {
                    minifacebook: getUser().token || null
                },
                body: formData
            });
            const result = await response.json();
            if (result.success) {
                setProfilePic(null);
                setCoverPic(null);
                setProfileData(null);
                setCoverData(null);
                fetchUserProfile(user_id);
                showProfileMessage(true, result.message);
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            console.error(
                "Error in Profile Update Client Side --> ",
                error.message
            );
            showProfileMessage(false, error.message);
        }
    };
    const personalInfoUpdate = async () => {
        const data = {
            name: name ? name : null,
            email: email ? email : null,
            current_password: currentPassword ? currentPassword : null,
            new_password: newPassword ? newPassword : null
        };
        
        /*
        if (!name || !email || !currentPassword || !newPassword) {
            showMessage(false, "All Fields Are Required");
        }
        */
        try {
            setIsLoading(true);
            const response = await fetch(`${api}/user/edit-personal-info`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    minifacebook: getUser().token || null
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            setIsLoading(false);
            if (result.success) {
                setName("");
                setEmail("");
                setCurrentPassword("");
                setNePassword("");
                showMessage(true, result.message);
                fetchUserProfile(user_id);
                closeEditForm();
            } else {
                setIsLoading(false);
                showMessage(false, result.message);
            }
        } catch (error) {
            setIsLoading(false);
            console.log(
                "Error in updating personal info client side --> ",
                error.message
            );
            showMessage(false, error.message);
        }
        
    };
    useEffect(() => {
        if (getUser().id === user_id) {
            document.title = "Profile Page - " + user_name;
        }
        getMe();
        fetchUserProfile(user_id);
        if (getting) return;
    }, [user_id, user_name]);

    const handleAddFriend = async id => {
        const btn = document.getElementById(id);
        try {
            await AddFriend(id);
            const request = await fetch(`${api}/user/get-user/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    minifacebook: getUser().token || null
                }
            });
            const response = await request.json();
            if (response.requests.includes(getUser().id)) {
                btn.classList.add("cancel-request");
                btn.textContent = "Cancel Request";
            } else {
                btn.classList.remove("cancel-request");
                btn.classList.add("add");
                btn.textContent = "Add Friend";
            }
        } catch (error) {
            console.log(
                "Error While Adding Fiend In Cliebt Side Profile --> ",
                error.message
            );
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
    const UnFriend = async id => {
        try {
            const request = await fetch(`${api}/user/unfriend/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    minifacebook: getUser().token || null
                }
            });
            const response = await request.json();
            getMe();
        } catch (error) {
            console.log(error);
        }
    };

    const isRequested = me => {
        if (me?.notifications?.length > 0) {
            let result = me?.notifications?.find(
                obj => obj.receiver_id === getUser().id
            );
            if (result?.receiver_id) {
                if (result?.receiver_id === getUser().id) {
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
    const isSentRequest = user => {
        console.log(user);
        if (user?.requests?.length > 0) {
            let result = user?.requests?.find(
                obj => obj.sender_id === getUser().id
            );
            if (result?.sender_id) {
                if (result?.sender_id === getUser().id) {
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
        <>
            {!getting && user?._id && user?._id !== null && (
                <>
                    <div className="profile-section">
                        <div ref={formRef} className="fixed-page">
                            <div className="edit--">
                                <img
                                    onClick={closeEditForm}
                                    src="/icons/close-x.png"
                                />
                                <h3>Edit Personal Info</h3>
                                <span ref={mesgRef}></span>
                                <input
                                    onChange={e => {
                                        setName(e.target.value);
                                    }}
                                    value={name}
                                    type="text"
                                    placeholder="Change User Name"
                                />
                                <input
                                    onChange={e => {
                                        setEmail(e.target.value);
                                    }}
                                    value={email}
                                    type="email"
                                    placeholder="Change Email"
                                />
                                <input
                                    onChange={e => {
                                        setCurrentPassword(e.target.value);
                                    }}
                                    value={currentPassword}
                                    type="password"
                                    placeholder="Enter Current Password"
                                />
                                <input
                                    onChange={e => {
                                        setNePassword(e.target.value);
                                    }}
                                    value={newPassword}
                                    type="password"
                                    placeholder="Enter New Password"
                                />
                                <button
                                    onClick={personalInfoUpdate}
                                    className="edit-btn"
                                >
                                    {isLoading ? "Processing..." : "Update Now"}
                                </button>
                            </div>
                        </div>
                        <div className="profile-head">
                            <div ref={profileRef} className=""></div>
                            <div className="cover">
                                {getUser().id === user._id && (
                                    <div className="pencil">
                                        <label htmlFor="cover-photo">
                                            <img src="/icons/camera.png" />
                                        </label>
                                        <input
                                            onChange={handleCoverImageChange}
                                            id="cover-photo"
                                            type="file"
                                            accept="*/*"
                                            hidden
                                        />
                                    </div>
                                )}
                                <img
                                    src={coverPic ? coverData : user.cover}
                                    alt="Cover Photo"
                                />
                            </div>
                            <div className="profile-pic">
                                {getUser().id === user._id && (
                                    <div className="pencil">
                                        <label htmlFor="profile-photo">
                                            <img src={"/icons/camera.png"} />
                                        </label>
                                        <input
                                            onChange={handleProfileImageChange}
                                            id="profile-photo"
                                            type="file"
                                            accept="*/*"
                                            hidden
                                        />
                                    </div>
                                )}
                                <img
                                    src={profilePic ? profileData : user.avatar}
                                    alt="Profile Photo"
                                />
                            </div>
                        </div>
                        <div className="name-section">
                            <h3>{user.name}</h3>
                            <h5>{user.email}</h5>
                            <h6>Joined Since - {getDate(user.createdAt)}</h6>

                            {/*--> User Edit Profile Action --> */}
                            {getUser().id === user._id && (
                                <div className="action-area">
                                    <button
                                        onClick={openEditForm}
                                        className="edit-personal"
                                    >
                                        Edit Profile
                                    </button>
                                    <button
                                        onClick={updateProfile}
                                        className="update-profile"
                                    >
                                        {profilePic || coverPic
                                            ? "Update Now"
                                            : "Update Profile"}
                                    </button>
                                </div>
                            )}
                            {/*--> If User Already Friend --> */}
                            {getUser().id !== user._id &&
                                isFriend(me, user?._id) && (
                                    <div className="action-area">
                                        <button
                                        onClick={()=>{
                                            navigate(`/chat-box/${user?.name}/${user?._id}`)
                                        }}
                                        className="message">
                                            Send Message
                                        </button>
                                        <button
                                            onClick={e => {
                                                UnFriend(user._id);
                                            }}
                                            className="unfriend"
                                        >
                                            Unfriend
                                        </button>
                                    </div>
                                )}

                            {/*--> If User Already Requested Me <--*/}
                            {getUser().id !== user._id && isRequested(me) && (
                                <div className="action-area">
                                    <button className="disabled-message">
                                        Can't Message
                                    </button>
                                    <button
                                        onClick={e => {
                                            AcceptRequest(user._id);
                                        }}
                                        className="accept"
                                    >
                                        Accept Request
                                    </button>
                                </div>
                            )}

                            {/*--> If User  Not Friend --> */}
                            {getUser().id !== user._id &&
                                !isRequested(me) &&
                                !isFriend(me, user._id) && (
                                    <div className="action-area">
                                        <button className="disabled-message">
                                            Can't Message
                                        </button>

                                        <button
                                            onClick={() => {
                                                handleAddFriend(user._id);
                                            }}
                                            id={user._id}
                                            className={
                                                user.requests?.includes(
                                                    getUser().id
                                                )
                                                    ? "cancel-request"
                                                    : "add"
                                            }
                                        >
                                            {user.requests?.includes(
                                                getUser().id
                                            )
                                                ? "Cancel Request"
                                                : "Add Friend"}
                                        </button>
                                    </div>
                                )}
                        </div>
                    </div>

                    {/* Here If The User Is Session User Display Write Post */}
                    {getUser().id === user._id && <CreatePost />}

                    {/* User Display Users All  Post */}
                    {user._id && (
                        <FetchAllPost
                            user={[user.name, user._id, user.avatar]}
                        />
                    )}
                </>
            )}
        </>
    );

    /*
    return (
        <>
            <div
                style={{ display: "none" }}
                ref={formRef}
                className="full-page"
            >
                <div className="edit-form">
                    <div onClick={closeEditForm} className="close-edit">
                        <i className="bi bi-x"></i>
                    </div>
                    <h3>Edit Profile</h3>
                    <label htmlFor="avtar">
                        {!fileData && <i className="bi bi-camera"></i>}
                        {fileData && (
                            <img
                                src={fileData ? fileData : "images/gallery.png"}
                            />
                        )}
                    </label>
                    <span ref={mesgRef}></span>
                    <input
                        onChange={handleFileChange}
                        type="file"
                        multiple
                        id="avtar"
                        accept="/*"
                        hidden
                    />
                    <input
                        onChange={e => {
                            setName(e.target.value);
                        }}
                        value={name}
                        type="text"
                        placeholder="Change User Name"
                    />
                    <input
                        ref={emailRef}
                        onChange={e => {
                            setEmail(e.target.value);
                        }}
                        value={email}
                        type="email"
                        placeholder="Change Email"
                    />
                    <input
                        ref={passwordRef}
                        onChange={e => {
                            setPassword(e.target.value);
                        }}
                        value={password}
                        type="password"
                        placeholder="Change Password"
                    />
                    <button onClick={sendDataToServer} className="edit-btn">
                        {isLoading ? "Processing..." : "Update Now"}
                    </button>
                </div>
            </div>
            <div className="profile-section">
                <div className="profile">
                    <div onClick={openEditForm} className="edit">
                        <i className="bi bi-pen"></i>
                    </div>
                    <img src={getUser().avtar} />
                    <h3>{getUser().name}</h3>
                    <h4>{getUser().email}</h4>
                </div>
            </div>
            <div className="post">
                <h3>Create New Post</h3>
                <textarea placeholder="Write A Post..."></textarea>
                <button className="post-btn">Post Now</button>
            </div>
            <Post />
        </>
    );
    */
};

export default Profile;
