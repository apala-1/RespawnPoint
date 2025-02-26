import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";

const Login = () => {
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

            console.log("Login Response:", response);

            if (response.data.token) {
                const user = response.data.user;

                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("token", response.data.token);
console.log("Token saved:", response.data.token); // Debugging

                if (user.role === "user") {
                    alert("User Login Successful!");
                    navigate("/user-dashboard");
                } else if (user.role === "admin") {
                    alert("If you are trying to log in as an admin, use the admin login page.");
                    navigate("/adminlogin");
                }
            } else {
                alert("Login Failed. Invalid email or password.");
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
                    <h1>Login Form</h1>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                    <button type="submit">Log In</button>
                    <div>
                        <a href="/forgot">Forgot your password?</a>
                    </div>
                    <div>
                        <a href="/signup">Create an account</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
