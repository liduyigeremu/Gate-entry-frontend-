export interface User {
    id: string;
    full_name: string;
    email: string;
    role: string;
    employee_id: string;
}

export const saveAuthData = (token: string, user: User) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(user));
    console.log("Auth data saved:", { token, user });
};

export const getToken = (): string | null => {
    return localStorage.getItem("authToken");
};

export const getUser = (): User | null => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
        try {
            return JSON.parse(userStr);
        } catch {
            return null;
        }
    }
    return null;
};

export const isAuthenticated = (): boolean => {
    return !!getToken();
};

export const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    console.log("User logged out");
};