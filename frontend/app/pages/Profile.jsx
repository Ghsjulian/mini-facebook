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
    const [file, setFile] = useState(null);
    const [fileData, setFileDataUrl] = useState(null);
    const formRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const openEditForm = () => {
        formRef.current.style.display = "block";
    };
    const closeEditForm = () => {
        formRef.current.style.display = "none";
    };
    const handleFileChange = event => {
        const imgfile = event.target.files[0];
        setFile(imgfile);
    };
    const showMessage = (message, type) => {
        if (type) {
            mesgRef.current.classList.add("success");
            mesgRef.current.textContent = message;
            closeEditForm();
        } else {
            mesgRef.current.classList.add("error");
            mesgRef.current.textContent = message;
        }
        setTimeout(() => {
            mesgRef.current.textContent = "";
            mesgRef.current.setAttribute("class", "");
        }, 3500);
    };

    const sendDataToServer = async () => {
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            emailRef.current.focus();
            showMessage("Invalid Email Address", false);
        } else if (password.trim().length < 5) {
            passwordRef.current.focus();
            showMessage("Password Will Be 6<", false);
        } else {
            // const api = import.meta.env.VITE_API_URL;
            const user = {
                name: name ? name : "",
                email: email ? email : "",
                password: password ? password : "",
                avatar: fileData && "YES"
            };
            const formData = new FormData();
            formData.append("file", file);
            formData.append("data", JSON.stringify(user));
            try {
                setIsLoading(true);
                const sendData = await fetch(`${api}/user/edit-profile`, {
                    method: "PUT",
                    /*headers: { "Content-Type": "multipart/form-data" },*/
                    body: formData
                    // JSON.stringify(data)
                });
                const response = await sendData.json();
                setIsLoading(false);
                if (response.success) {
                    showMessage(response.message, true);
                    setName("");
                    setEmail("");
                    setPassword("");
                    setFileDataUrl("");
                    setCookie("mini-facebook", JSON.stringify(response.user));
                } else {
                    throw new Error("Server Timeout Error");
                }
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        }
    };
    useEffect(() => {
        let fileReader;
        if (file) {
            fileReader = new FileReader();
            fileReader.onload = e => {
                const { result } = e.target;
                if (result) {
                    setFileDataUrl(result);
                }
            };
            fileReader.readAsDataURL(file);
        }
        return () => {
            if (fileReader && fileReader.readyState === 1) {
                fileReader.abort();
            }
        };
    }, [file]);

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
            {!getting && user._id !== null && (
                <div className="profile-section">
                    <div className="profile-head">
                        <div className="cover">
                            {getUser().id === user._id && (
                                <div className="pencil">
                                    <img src="/icons/camera.png" />
                                </div>
                            )}
                            <img src="/bg.png" alt="Cover Photo" />
                        </div>
                        <div className="profile-pic">
                            {getUser().id === user._id && (
                                <div className="pencil">
                                    <img src="/icons/camera.png" />
                                </div>
                            )}
                            <img
                                src={
                                    user.avatar ? user.avatar : "/icons/man.png"
                                }
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
                                <button className="update-profile">
                                    Update Cover
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
