import { getUser, api } from "../auth/isLogin";
import { useState } from "react";

const useComment = () => {
    const [isComment, setComment] = useState(false);
    const commentPost = async (id,comment) => {
        try {
            setComment(true);
            const request = await fetch(`${api}/post/comment-post/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    minifacebook: getUser().token || null
                },
                body : JSON.stringify({comment})
            });
            const response = await request.json();
            setComment(false);
            //console.log(response);
        } catch (error) {
            console.log("Error in Fetching Peoples --> ", error.message);
            setComment(false);
        } finally {
            setComment(false);
        }
    };

    return { commentPost, isComment };
};

export default useComment;
