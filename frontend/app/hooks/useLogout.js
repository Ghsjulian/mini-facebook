import { useAuth } from "../contexts/useAuth";
import useCookie from "../hooks/useCookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
        const { getUser, logout,api } = useAuth()
    const { setCookie } = useCookie();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const Logout = async () => {
        try {
            setLoading(true);
            const request = await fetch(`${api}/user/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    minifacebook: getUser().token || null
                }
            });
            const response = await request.json();
            setLoading(false);
            if (response.success) {
                setCookie("minifacebook", "");
                logout();
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };
    return { Logout, loading };
};
export default useLogout;
