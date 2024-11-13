import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, NavLink, Navigate } from "react-router-dom";
import Post from "../components/Post";
//import { useAuth } from "../auth/Auth";
import { getUser, api } from "../auth/isLogin";

const Profile = () => {
    const { user_id, user_name } = useParams();
    const [getting, setGetting] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const mesgRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [password, setPassword] = useState("");
    const [profilePic, setProfilePic] = useState(null);
    const [coverPic, setCoverPic] = useState(null);
    const profileRef = useRef(null);
    const formRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const openEditForm = () => {
        formRef.current.style.display = "block";
    };
    const closeEditForm = () => {
        formRef.current.style.display = "none";
    };

    const handleCoverImageChange = event => {
        const file = event.target.files[0];
        setCoverPic(file)
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
            };
            reader.readAsDataURL(file); // Read the file as a data URL
        }
    };

    const handleProfileImageChange = event => {
        const file = event.target.files[0];
        setProfilePic(file)
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
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
            formData.append("profilePic",profilePic);
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
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const result = await response.json();
            showProfileMessage(true, "Profile updated successfully!");
        } catch (error) {
            console.error(
                "Error in Profile Update Client Side --> ",
                error.message
            );
            showProfileMessage(
                false,
                "Failed to update profile. Please try again."
            );
        }
    };

    useEffect(() => {
        const fetchUser = async user_id => {
            try {
                setGetting(true);
                const request = await fetch(`${api}/user/get-user/${user_id}`, {
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
        if (getUser().id === user_id) {
            document.title = "Profile Page - " + user_name;
        }
        fetchUser(user_id);
        if (getting) return;
        fetchUser(user_id);
    }, [user_id, user_name]);
    return (
        <>
            {!getting && user?._id && user?._id !== null && (
                <div className="profile-section">
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
                                src={coverPic ? coverPic : "/bg.png"}
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
                                src={profilePic ? profilePic : user.avatar}
                                alt="Profile Photo"
                            />
                        </div>
                    </div>
                    <div className="name-section">
                        <h3>{user.name}</h3>
                        <h5>{user.email}</h5>
                        <h6>Joined Since - 25 January 2024</h6>

                        {/*--> User Edit Profile Action --> */}
                        {getUser().id === user._id && (
                            <div className="action-area">
                                <button className="edit-personal">
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
                        {user.friends?.includes(getUser().id) && (
                            <div className="action-area">
                                <button className="message">
                                    Send Message
                                </button>
                                <button className="unfriend">Unfriend</button>
                            </div>
                        )}
                        {/*--> If Not Fruend --> */}
                        {!user.friends?.includes(getUser().id) &&
                            getUser().id !== user._id && (
                                <div className="action-area">
                                    <button className="disabled-message">
                                        Can't Message
                                    </button>
                                    <button
                                        className={
                                            user.requests?.includes(
                                                getUser().id
                                            )
                                                ? "cancel-request"
                                                : "add"
                                        }
                                    >
                                        {user.requests?.includes(getUser().id)
                                            ? "Cancel Request"
                                            : "Add Friend"}
                                    </button>
                                </div>
                            )}
                    </div>
                </div>
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
