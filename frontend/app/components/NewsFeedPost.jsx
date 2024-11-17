import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { getUser, api } from "../auth/isLogin";
import PostFetching from "../skeletons/PostFetching";
import useLike from "../hooks/useLike";
import useComment from "../hooks/useComment";
import { getDate } from "../hooks/useDate";
import FetchComments from "./FetchComments";

const NewsFeedPost = () => {
    const { LikePost, isLiking } = useLike();
    const [comments, setComments] = useState([]);
    const [fetching, setFetching] = useState(false);

    const commentRef = useRef(null);
    const commentForm = useRef(null);
    const [comment, setComment] = useState("");
    const [postid, setPosId] = useState("");

    const { commentPost, isComment } = useComment();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const FetchAllPost = async () => {
        try {
            setLoading(true);
            const request = await fetch(`${api}/post/get-all-post/`, {
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

    const fetchComments = async id => {
        try {
            setFetching(true);
            const request = await fetch(`${api}/post/get-comments/${id}`, {
                method: "GET",
                headers: {
                    minifacebook: getUser().token || null
                }
            });
            const response = await request.json();
            setComments(response.comments);
            setFetching(false);
        } catch (error) {
            setFetching(false);
            console.log(
                "Error While Fetching Comments in Client Side --> ",
                error.message
            );
        }
    };

    const HandleLike = async (post, target) => {
        if (target.src) {
            var count = parseInt(target.nextSibling.textContent) || 0;
            await LikePost(post);
            try {
                const request = await fetch(
                    `${api}/post/get-post/${post._id}`,
                    {
                        method: "GET",
                        headers: {
                            minifacebook: getUser().token || null
                        }
                    }
                );
                const response = await request.json();
                if (response.post_likes.includes(getUser().id)) {
                    target.src = "/icons/red-heart.png";
                    target.nextSibling.textContent = count + 1;
                } else {
                    target.src = "/icons/blue-heart.png";
                    target.nextSibling.textContent = count - 1;
                }
            } catch (error) {
                console.log(error);
            }
        }
    };
    const HandleComment = async () => {
        if (postid !== "" && comment !== "") {
            await commentPost(postid, comment);
            openCommentForm(postid);
            commentRef.current.scrollHeight;
            setComment("");
        } else {
            return;
        }
    };

    const openCommentForm = async id => {
        setPosId(id);
        await fetchComments(id);
        commentRef.current.scrollHeight;
        commentForm.current.style.display = "flex";
    };
    const closeCommentForm = () => {
        FetchAllPost();
        commentForm.current.style.display = "none";
    };

    useEffect(() => {
        FetchAllPost();
        if (loading) return;
    }, []);

    return (
        <>
            {/* Comment Form */}
            <div ref={commentForm} className="comment-area">
                <div className="comment-form">
                    <img
                        onClick={closeCommentForm}
                        className="close"
                        src="/icons/close-x.png"
                    />
                    <h3>Post Comments</h3>
                    <div ref={commentRef} className="comments">
                        {/*Render all comments*/}
                        {comments.length === 0 && (
                            <div className="row">
                                <h3>No Comment Yet</h3>
                            </div>
                        )}
                        {comments.length > 0 &&
                            comments.map((newComment, index) => {
                                return (
                                    <div className="row">
                                        <NavLink
                                            className="user"
                                            to={`/profile/${newComment.commenter_name}/${newComment.commenter_id}`}
                                        >
                                            <img
                                                src={
                                                    newComment.commenter_avatar
                                                }
                                            />
                                            <span>
                                                {newComment.commenter_name}
                                            </span>
                                        </NavLink>
                                        {/*<button className="delete">
                                <img src="/icons/delete.png" />
                            </button>*/}
                                        <div className="comment">
                                            {newComment.comment_text}
                                        </div>
                                    </div>
                                );
                            })}

                        {/*<div className="row">
                            <div className="user">
                                <img src="/icons/man.png" />
                                <span>Ghs Julian</span>
                            </div>
                            <button className="delete">
                                <img src="/icons/delete.png" />
                            </button>
                            <div className="comment">This is my comment</div>
                        </div>*/}
                        {/*Render all comments*/}
                    </div>
                    <div className="type">
                        <input
                            type="text"
                            placeholder="Write a comment"
                            onKeyDown={e => {
                                if (e.key === "Enter") {
                                    HandleComment();
                                }
                            }}
                            onChange={e => {
                                setComment(e.target.value);
                            }}
                            value={comment}
                        />
                        <button
                            onClick={e => {
                                HandleComment();
                            }}
                        >
                            <img src="/icons/send-message.png" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Comment Form */}
            {loading && <PostFetching />}
            {!loading &&
                posts.length > 0 &&
                posts.map((post, index) => {
                    return (
                        <div key={index + 1234} id={post._id} className="post">
                            <NavLink
                                to={`/profile/${post?.poster_name}/${post?.poster_id}`}
                            >
                                <img src={post?.poster_avatar} />
                                <span>{post?.poster_name}</span>
                            </NavLink>
                            <div className="content">
                                <p>{post.post_content}</p>
                                {post?.post_img && (
                                    <img
                                        className="post--img"
                                        src={post?.post_img}
                                    />
                                )}
                            </div>
                            <div class="date">{getDate(post?.createdAt)}</div>

                            <div className="action-area">
                                <button className="love">
                                    <img
                                        onClick={e => {
                                            HandleLike(post, e.target);
                                        }}
                                        className={post?._id + 2}
                                        id="icon--"
                                        src={
                                            post?.post_likes.includes(
                                                getUser().id
                                            )
                                                ? "/icons/red-heart.png"
                                                : "/icons/blue-heart.png"
                                        }
                                    />
                                    <span>{post?.post_likes.length}</span>
                                </button>
                                <button
                                    onClick={e => {
                                        openCommentForm(post?._id);
                                    }}
                                    className="comment"
                                >
                                    <img
                                        id="icon--"
                                        src="/icons/comment-one.png"
                                    />
                                    <span>{post?.post_comments.length}</span>
                                </button>
                                <button className="share">
                                    <img
                                        id="icon--"
                                        src="/icons/share-one.png"
                                    />
                                </button>
                            </div>
                        </div>
                    );
                })}

            {posts.length === 0 && (
                <div className="post">
                    <h3>No Post Found</h3>
                </div>
            )}
        </>
    );
};

export default NewsFeedPost;
