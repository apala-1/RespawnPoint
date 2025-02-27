import React, { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";  
import "./Terms.css";

const Terms = () => {
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
                <div className="terms-page">
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
            <div className="termstitle"><h1 className="h1">Terms and Conditions</h1></div>
            
            <div className="terms-container">
                <p><strong>1. Introduction</strong></p>
                <p>Welcome to Respawn Point! By accessing our website, you agree to abide by these terms and conditions.</p>

                <p><strong>2. User Accounts</strong></p>
                <ul>
                    <li>Users must provide accurate information during signup.</li>
                    <li>Account security is the responsibility of the user.</li>
                    <li>We reserve the right to suspend or delete accounts that violate our terms.</li>
                </ul>

                <p><strong>3. Content and Usage</strong></p>
                <ul>
                    <li>Users can post content but must ensure it is legal and does not infringe on copyrights.</li>
                    <li>Inappropriate content may be removed at our discretion.</li>
                </ul>

                <p><strong>4. Game Developer Submissions</strong></p>
                <ul>
                    <li>Game developers must go through a verification process before submitting content.</li>
                    <li>Content must adhere to ethical standards and copyright laws.</li>
                </ul>

                <p><strong>5. Privacy Policy</strong></p>
                <ul>
                    <li>We collect certain user data to improve our services.</li>
                    <li>User personal information is protected and not shared without consent.</li>
                </ul>

                <p><strong>6. Limitations of Liability</strong></p>
                <ul>
                    <li>Respawn Point is not responsible for any damages resulting from platform use.</li>
                    <li>We do not guarantee uninterrupted access to our services.</li>
                </ul>

                <p><strong>7. Changes to Terms</strong></p>
                <p>These terms may be updated periodically. Continued use of the platform constitutes acceptance of changes.</p>
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

export default Terms;
