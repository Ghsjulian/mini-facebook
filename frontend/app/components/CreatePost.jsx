import React, { useState, useEffect, useRef } from "react";
import { getUser, api } from "../auth/isLogin";

const CreatePost = () => {
    const [postContent, setPostContent] = useState("");
    const [postImg, setPostImg] = useState(null);
    const [postImgData, setPostImgData] = useState(null);
    const [loading, setLoading] = useState(false);
    const mesgRef = useRef(null);

    const crossImage = () => {
        setPostImgData(null);
        setPostImg(null);
    };
    const handlePostIngChange = event => {
        const file = event.target.files[0];
        setPostImg(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = result => {
                setPostImgData(reader.result);
            };
            reader.readAsDataURL(file);
        }
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

    const postNow = async () => {
        var formData = new FormData();
        if (postContent === "") {
            showMessage(false, "Please Write A Post");
            return;
        }
        if (postImg) {
            formData.append("post_img", postImg);
        }
        const post = {
            post_content: postContent,
            post_img: postImg ? "YES" : "NO"
        };
        formData.append("data", JSON.stringify(post));
        try {
            setLoading(true);
            const request = await fetch(`${api}/post/create-post`, {
                method: "POST",
                headers: {
                    minifacebook: getUser().token || null
                },
                body: formData
            });
            const response = await request.json();
            setLoading(false);
            if (response.success) {
                showMessage(true, response.message);
                setPostContent("");
                setPostImgData(null);
                setPostImg(null);
            } else {
                showMessage(false, response.message);
            }
        } catch (error) {
            setLoading(false)
            console.log(
                "Error In Post Creating Client Side --> ",
                error.message
            );
            showMessage(false, error.message);
        }
    };

    return (
        <div className="post">
            <h3>Create New Post</h3>
            <span ref={mesgRef}></span>
            <div className="post--area">
                <textarea
                    onChange={e => {
                        setPostContent(e.target.value);
                    }}
                    value={postContent}
                    placeholder="Write A Post..."
                ></textarea>
                <div className="select-img">
                    {postImgData && (
                        <div className="close">
                            <img
                                onClick={crossImage}
                                src="/icons/close-x.png"
                            />
                        </div>
                    )}
                    <label htmlFor="post-img">
                        <img
                            className={postImgData ? "selected" : ""}
                            src={
                                postImgData ? postImgData : "/icons/gallery.png"
                            }
                            alt="select an image"
                        />
                    </label>
                    <input
                        onChange={handlePostIngChange}
                        type="file"
                        id="post-img"
                        accept="*/*"
                        hidden
                    />
                </div>
            </div>
            <button onClick={postNow} className="post-btn">
                {loading ? "Processing..." : "Post Now"}
            </button>
        </div>
    );
};

export default CreatePost;
