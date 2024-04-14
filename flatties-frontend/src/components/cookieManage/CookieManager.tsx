import Cookie from "js-cookie";

// CookieManager is a custom hook that provides functions to set, get and remove cookies.
function CookieManager (){
    const setCookie = (key: string, value: string) => {
        Cookie.set(key, value);
    }

    const getCookie = (key: string) => {
        return Cookie.get(key);
    }

    const removeCookie = (key: string) => {
        Cookie.remove(key);
    }

    const removeAllCookies = () => {
        const cookies = Cookie.get();
        for (let cookie in cookies) {
            Cookie.remove(cookie);
        }
    }
    const logout = () => {
        removeCookie("token");
        removeCookie("user");
    }

    return { setCookie, getCookie, removeCookie, removeAllCookies, logout };
}

export default CookieManager;