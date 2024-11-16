const useCookie = ()=>{
    const setCookie = async (cookieName, cookieValue) => {
    const expirationDate = new Date();
    expirationDate.setTime(
        expirationDate.getTime() + 1 * 30 * 24 * 60 * 60 * 1000
    ); 
    document.cookie = `${cookieName}=${cookieValue}; expires=${expirationDate.toUTCString()}; path=/`;
}

const getCookie = cname => {
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

return {getCookie,setCookie}
}

export default useCookie