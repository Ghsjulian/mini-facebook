import { getUser } from "../auth/isLogin";
import { useState } from "react";

const useAddFriend = () => {
    const [adding, setAdding] = useState(false);
    const [result, setResult] = useState({});

    const AddFriend = async user_id => {
        const api =
            "http://localhost:3000/api/user/send-friend-request/" + user_id;
        try {
            setAdding(true);
            const request = await fetch(api, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    minifacebook: getUser().token || null
                }
            });
            const response = await request.json();
            setResult(response);
            setAdding(false);
        } catch (error) {
            console.log("Error in Fetching Peoples --> ", error.message);
            setAdding(false);
        } finally {
            setAdding(false);
        }
    };

    return { adding, result, AddFriend };
};

export default useAddFriend;
