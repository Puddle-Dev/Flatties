import React, { FC, createContext, useContext } from 'react';
import CookieManager from './CookieManager';

interface CookieContextType {
    setCookie: (key: string, value: string) => void;
    getCookie: (key: string) => string | undefined;
    removeCookie: (key: string) => void;
    removeAllCookies: () => void;
    logout: () => void;
}

// create a context object for the cookie manager
const CookieContext = createContext<CookieContextType | null>(null);

// custom hook to use the cookie manager
const useCookie = () => {
    const context = useContext(CookieContext);
    if (!context) {
        throw new Error('useCookie must be used within a CookieProvider');
    }
    return context;
}

// cookie provider component
const CookieProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const cookieManager = CookieManager();

    return (
        <CookieContext.Provider value={cookieManager}>
            {children}
        </CookieContext.Provider>
    );
};

export { CookieProvider, useCookie };
