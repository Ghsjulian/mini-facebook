import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { getUser, api } from "../auth/isLogin";
import PostFetching from "../skeletons/PostFetching";
import useLike from "../hooks/useLike";

const FetchAllPost = ({ user }) => {
    const { LikePost, isLiking } = useLike();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const FetchPost = async id => {
        try {
            setLoading(true);
            const request = await fetch(`${api}/post/get-user-post/${id}`, {
                method: "GET",
                headers: {
                    minifacebook: getUser().token || null
                }
            });
            const response = await request.json();
            setLoading(false);
            if (response.posts) {
                setPosts(response.posts);
            }
        } catch (error) {
            setLoading(false);
            console.log(
                "Error in fetching post in client side --> ",
                error.message
            );
        }
    };

    const HandleLike = async (post, target) => {
        const btn = target.querySelector("img");
        alert(btn.src);
        return;
        await LikePost(post);
        try {
            const request = await fetch(`${api}/post/get-post/${post._id}`, {
                method: "GET",
                headers: {
                    minifacebook: getUser().token || null
                }
            });
            const response = await request.json();
            if (response.post_likes.includes(getUser().id)) {
                alert("Liked");
            } else {
                alert("Dislike");
            }
        } catch (error) {
            console.log(error);
        }
    };
    const CommentPost = async post => {};

    useEffect(() => {
        FetchPost(user[1]);
        if (loading) return;
    }, [user[1]]);

    return (
        <>
            {loading && <PostFetching />}
            {!loading &&
                posts.length > 0 &&
                posts.map((post, index) => {
                    return (
                        <div key={index + 1234} id={post._id} className="post">
                            <NavLink to={`/profile/${user[0]}/${user[1]}`}>
                                <img src={user[2]} />
                                <span>{user[0]}</span>
                            </NavLink>
                            <div className="content">
                                <p>{post.post_content}</p>
                                {post?.post_img && (
                                    <img
                                        className="post--img"
                                        src={post.post_img}
                                    />
                                )}
                            </div>
                            <div class="date">23 January 2024 / 0:50 PM</div>
                            <div className="action-area">
                                <button
                                    onClick={e => {
                                        HandleLike(post, e.target);
                                    }}
                                    className="love"
                                >
                                    <img
                                        className={post._id + 2}
                                        id="icon--"
                                        src="/icons/blue-heart.png"
                                    />
                                    <span>120</span>
                                </button>
                                <button className="comment">
                                    <img
                                        id="icon--"
                                        src="/icons/comment-one.png"
                                    />
                                    <span>568</span>
                                </button>
                                <button className="share">
                                    <img
                                        id="icon--"
                                        src="/icons/share-one.png"
                                    />
                                    <span>235</span>
                                </button>
                            </div>
                        </div>
                    );
                })}

            {posts.length === 0 && (
                <div className="post">
                    <h3>{user[0]} Has No Post</h3>
                </div>
            )}
        </>
    );
};

export default FetchAllPost;
