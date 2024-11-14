import { getUser, api } from "../auth/isLogin";
import { useState } from "react";

const useLike = () => {
    const [isLiking, setLiking] = useState(false);
    const LikePost = async post => {
        try {
            setLiking(true);
            const request = await fetch(`${api}/post/like-post/${post._id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    minifacebook: getUser().token || null
                }
            });
            const response = await request.json();
            setLiking(false);
            //console.log(response);
        } catch (error) {
            console.log("Error in Fetching Peoples --> ", error.message);
            setLiking(false);
        } finally {
            setLiking(false);
        }
    };

    return { LikePost, isLiking };
};

export default useLike;
