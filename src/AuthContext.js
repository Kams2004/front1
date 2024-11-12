import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Auth Context
const AuthContext = createContext();

// Custom hook to use the Auth Context
export const useAuth = () => {
    return useContext(AuthContext);
};

// Provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isConnected, setIsConnected] = useState(false); // Track if user is connected
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for user data
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsConnected(true);
        }
        setLoading(false);
    }, []);

    const login = (userData) => {
        const user = {
            name: `${userData.firstName} ${userData.lastName}`,
            email: userData.email,
            role: userData.role,
            accessToken: userData.accessToken,
            doctorId: userData.doctorId,
        };
        setUser(user);
        setIsConnected(true);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('userRole', user.role);
        localStorage.setItem('accessToken', user.accessToken);
        localStorage.setItem('doctorId', user.doctorId);
        localStorage.setItem('firstName', userData.firstName);
        localStorage.setItem('lastName', userData.lastName);
        localStorage.setItem('email', userData.email);
    };
    

    
    

    const logout = () => {
        setUser(null);
        setIsConnected(false);
        localStorage.clear(); // Clear all items from localStorage
    };
    

    const value = {
        user,
        isConnected,
        login,
        logout,
        loading
    };

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export default AuthContext;
