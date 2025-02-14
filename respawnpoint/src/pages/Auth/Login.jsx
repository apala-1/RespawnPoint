import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';
import { useContext } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);  
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/auth/login", {
                email,
                password
            });

            if (response.data.user) {
                alert("Login Successful!");
                
                login(response.data.user);  
                localStorage.setItem("user", JSON.stringify(response.data.user));  
                
                navigate("/"); 
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
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="Email"
                        required
                    />
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}  
                        placeholder="Password"
                        required
                    />
                    <button type="submit">Log In</button>
                    <div>
                        <a href="/ForgotPassword/index.html">Forgot your password?</a>
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
