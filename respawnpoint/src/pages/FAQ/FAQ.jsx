import React from "react";
import "./FAQ.css";

const FAQ = () => {
    return(
        <div className="faq-container">
            <div className="navbar">
                <div className="navbar-left">
                    <h1>RESPAWN POINT</h1>
                </div>
                <div className="navbar-center">
                    <ul>
                        <li>Home</li>
                        <li>Tutorials</li>
                        <li>Reviews</li>
                    </ul>
                </div>
                <div className="navbar-right">
                    <div className="items-right">
                        <a href="/login"><button className="logIn">Log In</button></a>
                        <a href="/signup"><button className="signUp">Sign Up</button></a>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                </div>
            </div>

            <div className="faq-content">
                <h2>Frequently Asked Questions</h2>
                <div className="faq-item">
                    <h3>What is Respawn Point?</h3>
                    <p>Respawn Point is a gaming platform that connects users with their favorite games, reviews, tutorials, and more!</p>
                </div>
                <div className="faq-item">
                    <h3>How do I sign up?</h3>
                    <p>You can sign up by clicking the 'Sign Up' button on the top right of the website. Fill in the required details to get started!</p>
                </div>
                <div className="faq-item">
                    <h3>Can I submit a game review?</h3>
                    <p>Yes, game reviews can be submitted by logging in and navigating to the reviews section where you can share your thoughts.</p>
                </div>
                <div className="faq-item">
                    <h3>How do I reset my password?</h3>
                    <p>If you've forgotten your password, simply click on the 'Forgot Password' link on the login page and follow the instructions to reset it.</p>
                </div>
                <div className="faq-item">
                    <h3>How can I contact support?</h3>
                    <p>If you need help, please reach out to our support team through the 'Contact Us' section located in the footer of the website.</p>
                </div>
            </div>
        </div>
    );
}

export default FAQ;
