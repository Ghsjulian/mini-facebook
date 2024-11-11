import useCookie from "../hooks/useCookie";

export const api = import.meta.env.VITE_API_URL;

export const isLogin = () => {
    const { getCookie } = useCookie();
    const cookie = getCookie("minifacebook") || null;
    if (cookie !== null) {
        const data = JSON.parse(cookie) || null;
        if (data !== null && data.token) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
};
export const getUser = () => {
    const { getCookie } = useCookie();
    const cookie = getCookie("minifacebook") || null;
    if (cookie !== null) {
        const data = JSON.parse(cookie) || null;
        if (data !== null && data.token) {
            return data;
        } else {
            return false;
        }
    } else {
        return false;
    }
};

