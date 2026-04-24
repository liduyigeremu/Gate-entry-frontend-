'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
    id: string;
    full_name: string;
    email: string;
    role: string;
    employee_id: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (token: string, user: User) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        // Load saved auth data on mount
        const savedToken = localStorage.getItem("authToken");
        const savedUser = localStorage.getItem("user");
        
        if (savedToken && savedUser) {
            setToken(savedToken);
            
            // Check if savedUser is valid JSON and not "undefined"
            try {
                if (savedUser && savedUser !== "undefined") {
                    const parsedUser = JSON.parse(savedUser);
                    setUser(parsedUser);
                } else {
                    // Invalid user data, clear it
                    localStorage.removeItem("user");
                    localStorage.removeItem("authToken");
                }
            } catch (error) {
                console.error("Error parsing user data:", error);
                // Clear invalid data
                localStorage.removeItem("user");
                localStorage.removeItem("authToken");
            }
        }
    }, []);

    const login = (newToken: string, newUser: User) => {
        setToken(newToken);
        setUser(newUser);
        localStorage.setItem("authToken", newToken);
        localStorage.setItem("user", JSON.stringify(newUser));
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{
            user,
            token,
            login,
            logout,
            isAuthenticated: !!token
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}