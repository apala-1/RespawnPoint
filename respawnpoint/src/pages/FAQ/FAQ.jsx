import React, { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";  
import "./FAQ.css";

const FAQ = () => {
    const navigate = useNavigate();
        const [menuActive, setMenuActive] = useState(false);  // For toggling
         
        
            const handleLogout = () => {
                localStorage.removeItem("token"); // Remove JWT
                window.location.href = "/login"; // Redirect to login page
            };
        
            const toggleMenu = () => {
                setMenuActive(!menuActive); // Toggle active state
            };  
        return(
                <div className="faq-page">
                     <div className="navbar">
                         <div className="navbar-left">
                             <h1>RESPAWN POINT</h1>
                         </div>
                         <div className="navbar-center">
                             <ul>
                                 <li onClick={() => navigate("/user-dashboard")}>Home</li>
                                 <li onClick={() => navigate("/tutorials")}>Tutorials</li>
                                 <li onClick={() => navigate("/reviews")}>Reviews</li>
                             </ul>
                         </div>
                         <div className="navbar-right">
                             <div className="items-right">
                                 <a href="/profile">
                                     <button className="profile-btn">Profile</button>
                                 </a>
                                 <button onClick={handleLogout} className="logout-btn">
                                     Logout
                                 </button>
                                 <i className="fa-solid fa-magnifying-glass"></i>
                             </div>
                             <div className="icons">
                                 <div
                                     id="menuIcon"
                                     className="game"
                                     onClick={toggleMenu}  // Add the toggle functionality here
                                 >
                                     =
                                 </div>
                             </div>
                         </div>
                     </div>
            
                     <div className={`restPage ${menuActive ? "active" : ""}`}>  {/* Toggling class */}
                         <ul>
                         <li onClick={() => navigate("/user-dashboard")}>Home</li>
                                 <li onClick={() => navigate("/tutorials")}>Tutorials</li>
                                 <li onClick={() => navigate("/reviews")}>Reviews</li>
                         </ul>
                         <a href="/profile">
                             <button className="profile-btn">Profile</button>
                         </a>
                         <button onClick={handleLogout} className="logout-btn">
                             Logout
                         </button>
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
            <div className="footer">
                <div className="left-footer">
                    <h1 className="left-footer-text">Contact Us</h1>
                    <div className="contact-items">
                        <div className="phone-contact">
                            <i className="fa-solid fa-phone"></i>
                            <p className="phone-number">9763426814</p>
                        </div>
                        <div className="email-contact">
                            <i className="fa-solid fa-envelope"></i>
                            <p className="email">apala13579@gmail.com</p>
                        </div>
                    </div>
                </div>
                <div className="middle-footer">
                    <h1 className="middle-footer-text">Main Sections</h1>
                    <ul className="middle-footer-links">
                        <li onClick={() => navigate("/user-dashboard")}>Home</li>
                        <li onClick={() => navigate("/reviews")}>Game Reviews</li>
                        <li onClick={() => navigate("/tutorials")}>Tutorials</li>
                        <li onClick={() => navigate("/forum")}>Community / Forum</li>
                    </ul>
                </div>
                <div className="right-footer">
                    <h1 className="right-footer-text">Quick Links</h1>
                    <ul className="right-footer-links">
                        <li onClick={() => navigate("/about")} className="aboutUs-link-footer">About Us</li>
                        <li onClick={() => navigate("/faq")} className="faqs-link-footer">FAQs</li>
                        <li onClick={() => navigate("/terms")} className="terms-link-footer">Terms and Conditions</li>
                        <li onClick={() => navigate("/privacy")} className="privacy-link-footer">Privacy Policy</li>
                    </ul>
                </div>
            </div>
            <div className="copyright-foot">
                <h1 className="copyright-text">© 2024 RespawnPoint. All rights reserved.</h1>
            </div>
    </div>
    );
}

export default FAQ;
