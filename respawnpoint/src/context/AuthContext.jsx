import { createContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Signup function
    const signup = async (name, email, password) => {
        try {
            const res = await axios.post("http://localhost:5000/auth/register", { name, email, password });
            setUser({ ...res.data.user, token: res.data.token });
            localStorage.setItem("token", res.data.token);
        } catch (err) {
            console.error(err.response?.data?.error || "Signup failed");
        }
    };

    // Login function
    const login = async (email, password) => {
        try {
            const res = await axios.post("http://localhost:5000/auth/login", { email, password });

            // Save the user details and token directly in the context
            setUser({ ...res.data.user, token: res.data.token });

            // Save token to localStorage
            localStorage.setItem("token", res.data.token);

            // Redirect based on role
            if (res.data.user.role === "admin") {
                window.location.href = "/admin-dashboard";  // Redirect to admin dashboard
            } else {
                window.location.href = "/";  // Redirect to home for normal users
            }
        } catch (err) {
            console.error(err.response?.data?.error || "Login failed");
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, signup, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
