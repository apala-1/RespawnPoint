import { createContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const signup = async (name, email, password) => {
        try {
            const res = await axios.post("http://localhost:5000/auth/register", { name, email, password });
            setUser(res.data.user);
            localStorage.setItem("token", res.data.token);
        } catch (err) {
            console.error(err.response?.data?.error || "Signup failed");
        }
    };

    const login = async (email, password) => {
        try {
            const res = await axios.post("http://localhost:5000/auth/login", { email, password });
            setUser(res.data.user);
            localStorage.setItem("token", res.data.token);
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
