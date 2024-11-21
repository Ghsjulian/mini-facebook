import { useAuth } from "../contexts/useAuth";
import { useState } from "react";

const useFindFriend = () => {
        const { getUser, api } = useAuth()
    const [isFetching, setFetching] = useState(false);
    const [peoples, setPeople] = useState([]);

    const FindPeoples = async () => {
        try {
            setFetching(true);
            const request = await fetch(`${api}/user/get-all-user`, {
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
            console.log("Error in Fetching Peoples --> ", error.message);
            setFetching(false);
        } finally {
            setFetching(false);
        }
    };

    return { isFetching, peoples, FindPeoples };
};

export default useFindFriend;
