// contexts/AuthContext.js
"use client";

import { createContext, useEffect, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    //check if the isLoggedIn in the local storage
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const isLogged = localStorage.getItem('isLoggedIn');
        if (isLogged) {
            setIsLoggedIn(true);
        }
    }
    , []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}