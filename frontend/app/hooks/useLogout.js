import { getUser } from "../auth/isLogin";
import { useState } from "react";

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const Logout = async () => {
        const api = "http://localhost:3000/api/user/logout";
        try {
            setLoading(true);
            const request = await fetch(api, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    minifacebook: getUser().token || null
                }
            });
            const response = await request.json();
            console.log(response);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };
    return { Logout, loading };
};
export default useLogout