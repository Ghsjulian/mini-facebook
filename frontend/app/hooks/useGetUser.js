import { getUser,api } from "../auth/isLogin";
import { useState, useEffect } from "react";

const useGetUser = () => {
    const [getting, setGetting] = useState(false);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null); // Optional: To handle errors

    // Define the async function inside the useEffect
        const fetchUser = async (user_id) => {
            try {
                setGetting(true);
                const request = await fetch(`${api}/user/get-user/${user_id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        minifacebook: getUser().token || null
                    }
                });
                if (!request.ok) {
                    throw new Error("Network response was not ok");
                }
                const response = await request.json();
                setUser(response);
            } catch (error) {
                console.error(error);
                setError(error); // Set error state
            } finally {
                setGetting(false);
            }
        };

    return { getting,fetchUser, user, error }; // Return error as well if needed
};

export default useGetUser;
