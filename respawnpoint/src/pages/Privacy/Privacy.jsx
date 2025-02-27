import React, { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";  
import "./Privacy.css";

const Privacy = () => {
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
                <div className="privacy-page">
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
            <div className="privacytitle"><h1 className="h1">Privacy Policy</h1></div>
            
            <div className="privacy-container">
                <p><strong>1. Introduction</strong></p>
                <p>At Respawn Point, we respect your privacy and are committed to protecting your personal data. This policy outlines how we collect, use, and safeguard your information.</p>

                <p><strong>2. Information We Collect</strong></p>
                <ul>
                    <li>Personal details like name, email, and username during signup.</li>
                    <li>Game preferences and activity on our platform.</li>
                    <li>Usage data, including browser type, IP address, and interaction history.</li>
                </ul>

                <p><strong>3. How We Use Your Information</strong></p>
                <ul>
                    <li>To provide, personalize, and improve our services.</li>
                    <li>To communicate important updates, notifications, and promotional offers.</li>
                    <li>To maintain security and prevent fraud.</li>
                </ul>

                <p><strong>4. Data Sharing and Third Parties</strong></p>
                <ul>
                    <li>We do not sell or rent your personal data.</li>
                    <li>Data may be shared with third-party services for analytics, payment processing, and hosting.</li>
                    <li>We may disclose information when required by law or for security reasons.</li>
                </ul>

                <p><strong>5. Cookies and Tracking</strong></p>
                <ul>
                    <li>We use cookies to enhance user experience and analyze site performance.</li>
                    <li>You can disable cookies through your browser settings.</li>
                </ul>

                <p><strong>6. Security Measures</strong></p>
                <ul>
                    <li>We implement encryption and security protocols to protect user data.</li>
                    <li>Despite precautions, no online service is 100% secure, so users should take additional security steps.</li>
                </ul>

                <p><strong>7. Changes to Privacy Policy</strong></p>
                <p>We may update this policy periodically. Continued use of our services after updates means acceptance of the new terms.</p>
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

export default Privacy;
