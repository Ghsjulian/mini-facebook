import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

const FetchComments = () => {
    const  { getUser, api } = useAuth()
    const [comments, setComments] = useState([]);
    const [fetching, setFetching] = useState(false);

    const FetchPost = async () => {
        try {
            setFetching(true);
            const request = await fetch(`${api}/post/get-post/${post._id}`, {
                method: "GET",
                headers: {
                    minifacebook: getUser().token || null
                }
            });
            const response = await request.json();
            setComments(response.post_comments);
            console.log(response);
            setFetching(false);
        } catch (error) {
            setFetching(false);
            console.log(
                "Error While Fetching Comments in Client Side --> ",
                error.message
            );
        }
    };
    /*
    useEffect(() => {
        FetchPost(post_id);
        if (fetching) return;
    }, [post_id]);
*/
    return (
        <div className="comments">
            <div className="row">
                <div className="user">
                    <img src="/icons/man.png" />
                    <span>Ghs Julian</span>
                </div>
                <button className="delete">
                    <img src="/icons/delete.png" />
                </button>
                <div className="comment">This is my comment</div>
            </div>
        </div>
    );
};

export default FetchComments;
