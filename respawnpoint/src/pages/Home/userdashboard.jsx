import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./homepage.css";

const userdashboard = () => {
    const [menuActive, setMenuActive] = useState(false);  // For toggling
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove JWT
        localStorage.removeItem("name"); // Remove JWT
        localStorage.removeItem("email"); // Remove JWT
        localStorage.removeItem("role");
        localStorage.removeItem("user"); // Remove JWT
        window.location.href = "/login"; // Redirect to login page
    };

    const toggleMenu = () => {
        setMenuActive(!menuActive); // Toggle active state
    };

    return (
       <div className="everything">
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
         
                            <button className="profile-btn" onClick={() => navigate("/profile")}>Profile</button>
            
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

                    <button className="profile-btn" onClick={() => navigate("/profile")}>Profile</button>

                <button onClick={handleLogout} className="logout-btn">
                    Logout
                </button>
            </div>

            <div className="main-img">
                <div className="black-img">
                    <div className="inside-div">
                        <h1 className="Firsttext">Latest<br/>Game<br/>Information</h1>
                        <div className="featured-pic"></div>
                    </div>
                    <div className="bottom">
                        <div className="forums-option" onClick={() => navigate("/forum")}>Forums</div>
                        <div className="playthroughs-option" onClick={() => navigate("/playthroughs")}>Playthroughs</div>
                        <div className="reviews-option" onClick={() => navigate("/reviews")}>Reviews</div>
                    </div>
                </div>
            </div>

            <div className="featured">
                <h1 className="featured-games-title">Featured Games</h1>
                <p className="see-all-featured-games" onClick={() => navigate("/featured")}>See all &nbsp;<i className="fa-solid fa-arrow-right"></i></p>
                <div className="shown-games">
                    <div className="first-game-shown">
                        <h1>Minecraft</h1>
                        <p>blah blah blah</p>
                    </div>
                    <div className="second-game-shown">
                        <h1>Call of Duty</h1>
                        <p>blah blah blah</p>
                    </div>
                </div>
            </div>
            <hr/>

            <div className="third">
                <div className="shown-areas">
                    <div className="first-area-shown" onClick={() => navigate("/tutorials")}>
                        <h1>Tutorials</h1>
                    </div>
                    <div className="second-area-shown" onClick={() => navigate("/reviews")}>
                        <h1>Reviews</h1>
                    </div>
                    <div className="third-area-shown" onClick={() => navigate("/playthroughs")}>
                        <h1> Playthroughs</h1>
                    </div>
                </div>
            </div>

            <div className="forum">
                <h1 className="forumText">Forum</h1>
                <div className="inside-forum">
                    <i className="fa-solid fa-lock"></i>
                    <p className="text" onClick={() => navigate("/signup")}>Sign Up to read and write other's posts</p>
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
};

export default userdashboard;
