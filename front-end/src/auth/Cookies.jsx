import React from "react";
const adminID = import.meta.env.VITE_ADMIN_ID;

export const setCookie = async (cookieName, cookieValue) => {
    const expirationDate = new Date();
    expirationDate.setTime(
        expirationDate.getTime() + 2 * 30 * 24 * 60 * 60 * 1000
    ); // 2 months in milliseconds
    document.cookie = `${cookieName}=${cookieValue}; expires=${expirationDate.toUTCString()}; path=/`;
};
export const deleteCookie = cookieName => {
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() - 1);
    document.cookie = `${cookieName}=; expires=${expirationDate.toUTCString()}; path=/`;
};
export const getCookie = cname => {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};

export const getInfo = () => {
    const data = getCookie("user") ? getCookie("user") : null;
    const cookies = JSON.parse(data);
    if (cookies) {
        return cookies;
    } else {
        return {
            id : null,
            token : null,
            date: null,
            user_type : null,
        };
    }
};

export const isAdmin = () => {
    const info = getInfo();
    if (info.id=== adminID) {
        return true;
    } else {
        return false;
    }
};
