import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';
import axios from "axios";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            console.log("Login data:", { email, password }); 
            const response = await axios.post("http://localhost:5000/auth/login", { email, password });
    
            console.log("Response:", response);
    
            if (response.data.user) {
                const user = response.data.user;
                
                if (user.role === "admin") {
                    alert("Admin Login Successful!");

                    localStorage.setItem("admin", JSON.stringify(user));  
                    localStorage.setItem("adminToken", response.data.token);
                    
                    navigate("/admin-dashboard");
                } else if (user.role === "user") {
                    alert("If you are a normal user, please log in using the user login page.");
                    navigate("/login");
                }
            } else {
                alert("Invalid login credentials.");
            }
        } catch (error) {
            console.error("Login error:", error.response?.data || error.message);
            alert("An error occurred. Please try again.");
        }
    };

    
    return (
        <div className="login">
            <div className="login-container">
                <form onSubmit={handleSubmit}>
                    <h1>Admin Login</h1>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Admin Email"
                        required
                    />
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Admin Password"
                        required
                    />
                    <button type="submit">Log In</button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
