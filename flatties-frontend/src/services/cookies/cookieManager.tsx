import Cookies from 'js-cookie';

interface CookieManager {
    setCookie: (name: string, value: string) => void;
    getCookie: (name: string) => string | undefined;
    removeCookie: (name: string) => void;
}

function useCookieManager(): CookieManager {
    const setCookie = (name: string, value: string) => {
        Cookies.set(name, value);
    };

    const getCookie = (name: string) => {
        return Cookies.get(name);
    };

    const removeCookie = (name: string) => {
        Cookies.remove(name);
    };

    return {
        setCookie,
        getCookie,
        removeCookie
    };
}

export default useCookieManager;
