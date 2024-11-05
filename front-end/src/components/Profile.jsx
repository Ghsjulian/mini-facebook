import React, { useState, useEffect, useRef } from "react";
import { useNavigate, NavLink, Navigate } from "react-router-dom";
import Post from "./Post";
//import { useAuth } from "../auth/Auth";
import { setCookie } from "../auth/Cookies";

const Profile = () => {
    const navigate = useNavigate();
  //  const { isAuthenticated, getUser } = useAuth();
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
            const api = import.meta.env.VITE_API_URL;
            const user = {
                name: name ? name : "",
                email: email ? email : "",
                password: password ? password : "",
                avtar: fileData && "YES"
            };
            const formData = new FormData();
            formData.append("file", file);
            formData.append("data", JSON.stringify(user));
            try {
                setIsLoading(true);
                const sendData = await fetch(
                    `${api}/edit-user/${getUser().id}`,
                    {
                        method: "PUT",
                        /*headers: { "Content-Type": "multipart/form-data" },*/
                        body: formData
                        // JSON.stringify(data)
                    }
                );
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
        if (!isAuthenticated()) {
            navigate("/login");
        }
    }, [isAuthenticated()]);

    return (
        <>
            {isAuthenticated() ? (
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
                                {!fileData &&<i className="bi bi-camera"></i>}
                                {fileData && (
                                    <img
                                        src={
                                            fileData
                                                ? fileData
                                                : "images/gallery.png"
                                        }
                                    />
                                )}
                            </label>
                            <span ref={mesgRef}></span>
                            <input
                                onChange={handleFileChange}
                                type="file"
                                multiple
                                id="avtar"
                                accept="*/*"
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
                            <button
                                onClick={sendDataToServer}
                                className="edit-btn"
                            >
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
            ) : (
                <Navigate to="/login" />
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
                        <img
                            src={fileData ? fileData : "images/upload-img.png"}
                        />
                    </label>
                    <span ref={mesgRef}></span>
                    <input
                        onChange={handleFileChange}
                        type="file"
                        multiple
                        id="avtar"
                        accept="*/ /*"
                        hidden/>
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
