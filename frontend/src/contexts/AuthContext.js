import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authError, setAuthError] = useState(""); // State to hold authentication errors

    useEffect(() => {
        const checkOrgLoggedIn = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/org/auth/user`, {
                    method: 'GET',
                    credentials: 'include', // Ensure cookies are sent with the request
                });
                if (response.ok) {
                    const data = await response.json();
                    setCurrentUser(data);
                } else {
                    setCurrentUser(null);
                }
            } catch (error) {
                console.error("Failed to check if organizer is logged in:", error);
                setCurrentUser(null);
                setAuthError(error.toString());
            } finally {
                // set after two seconds
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
                // setLoading(false);
            }
        };

        checkOrgLoggedIn();
    }, []);

    const login = async (email, password) => {
        setAuthError(""); // Reset authentication error before attempting login
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/org/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.msg || "Login failed");
            }
            const data = await response.json();
            setCurrentUser(data);
            return true;
        } catch (error) {
            console.error("Login failed:", error);
            setAuthError(error.toString());
            return false;
        }
    };

    const register = async (name, email, password) => {
        setAuthError(""); // Reset authentication error before attempting registration
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/org/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ name, email, password }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.msg || "Registration failed");
            }
            const data = await response.json();
            setCurrentUser(data); // Update current user state based on response
            return true;
        } catch (error) {
            console.error("Registration failed:", error);
            setAuthError(error.toString());
            return false;
        }
    };

    const logout = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/org/auth/logout`, {
                method: 'POST',
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error("Logout failed");
            }
            setCurrentUser(null);
        } catch (error) {
            console.error("Logout failed:", error);
            setAuthError(error.toString());
        }
    };

    return (
        <AuthContext.Provider value={{ currentUser, loading, login, register, logout, authError }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
