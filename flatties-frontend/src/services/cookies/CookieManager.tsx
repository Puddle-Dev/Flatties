import Cookie from "js-cookie";

// CookieManager is a custom hook that provides functions to set, get and remove cookies.
function CookieManager (){
    const setCookie = (key: string, value: string) => {
        // check if the value is an object
        if (typeof value === "object") {
            // stringify the object
            const jsonValue = JSON.stringify(value);
            Cookie.set(key, jsonValue);
        } else{
            Cookie.set(key, value);
        }
    }

    const getCookie = (key: string) => {
        const cookieValue= Cookie.get(key);
        if (cookieValue !== undefined && cookieValue !== null) {    // check if the cookie exists
            try {
                // check if the value is an object
                const parsedValue = JSON.parse(cookieValue);
                // return the parsed object if the value is an object
                return parsedValue;
            } catch (error) {
                // return the value if the value is not an object
                return cookieValue;
            }
        }
        // return undefined if the cookie does not exist
        return undefined;
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