import React, { useState, useEffect, useRef } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Post from "./Post";
import { useAuth } from "../auth/Auth";

const Profile = () => {
    const { isAuthenticated } = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
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
    const sendDataToServer = async () => {
        const api = import.meta.env.VITE_API_URL;
        const user = {
            name: name ? name : "",
            email: email ? email : "",
            password: password ? password : "",
            avtar: fileData ? "YES" : "NO"
        };
        const formData = new FormData();
        formData.append("file", file);
        formData.append("data", JSON.stringify(user));
        try {
            setIsLoading(true);
            const sendData = await fetch(
                `${api}/edit-user/${isAuthenticated().id}`,
                {
                    method: "PUT",
                    /*headers: { "Content-Type": "multipart/form-data" },*/
                    body: formData
                    // JSON.stringify(data)
                }
            );
            const response = await sendData.json();
            setIsLoading(false);
            console.log(response);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
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
    return (
        <>
            <div
                style={{ display: "none" }}
                ref={formRef}
                className="full-page"
            >
                {/* Create Popup Edit Form */}
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
                        onChange={e => {
                            setEmail(e.target.value);
                        }}
                        value={email}
                        type="email"
                        placeholder="Change Email"
                    />
                    <input
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
                {/* Create Popup Edit Form */}
            </div>
            <div className="profile-section">
                <div className="profile">
                    <div onClick={openEditForm} className="edit">
                        <i className="bi bi-pen"></i>
                    </div>
                    <img src="images/girl.png" />
                    <h3>Ghs Julian </h3>
                    <h4>ghsjulian@gmail.com</h4>
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
};

export default Profile;
