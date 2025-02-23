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
            const response = await axios.post("http://localhost:5000/auth/login", {
                email,
                password
            });

            // Check if the response contains the user and if the user is an admin
            if (response.data.user && response.data.user.role === "admin") {
                alert("Admin Login Successful!");
                localStorage.setItem("admin", JSON.stringify(response.data.user)); // Store admin data in localStorage
                navigate("/admin-dashboard"); // Navigate to admin dashboard
            } else {
                alert("Invalid admin credentials.");
            }
        } catch (error) {
            console.error("Login error:", error);
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
