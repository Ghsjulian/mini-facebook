import { getUser } from "../auth/isLogin";
import { useState } from "react";

const useFindFriend = () => {
    const [isFetching, setFetching] = useState(false);
    const [peoples, setPeople] = useState([]);

    const FindPeoples = async () => {
        const api = "http://localhost:3000/api/user/get-all-user";
        try {
            setFetching(true);
            const request = await fetch(api, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    minifacebook: getUser().token || null
                }
            });
            const response = await request.json();
            setPeople(response);
            setFetching(false);
        } catch (error) {
            console.log("Error in Fetching Peoples --> ",error.message);
            setFetching(false);
        } finally {
            setFetching(false);
        }
    };

    return { isFetching, peoples, FindPeoples };
};

export default useFindFriend;
