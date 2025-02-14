import React from "react";
import { useNavigate } from "react-router-dom";
import "./homepage.css";


const HomePage = () => {
    const navigate = useNavigate();
    // const menuIcon = document.getElementById("menuIcon");
    // const items = document.getElementById("items");

    // menuIcon.onclick = function(){
    //     console.log("Menu Icon Clicked!");
    //     items.classList.toggle("active");
    // }
    return(
       <div className="everything">
                    <div className="navbar">
                    <div className="navbar-left">
                        <h1>RESPAWN POINT</h1>
                    </div>
                    <div className="navbar-center">
                        <ul>
                            <li onClick={() => navigate("/homepage")}>Home</li>
                            <li onClick={() => navigate("/tutorials")}>Tutorials</li>
                            <li onClick={() => navigate("/reviews")}>Reviews</li>
                        </ul>
                    </div>
                    <div className="navbar-right">
                        <div className="items-right">
                        <button className="logIn" onClick={()  => navigate("/login")}>Log In</button>
                        <button className="signUp" onClick={() => navigate("/signup")}>Sign Up</button>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>
                        <div className="icons">
                        <div id="menuIcon" className="game"></div>
                        <div className="search"></div>
                        </div>
                    </div>
                </div>
                <div className="restPage" id = "items">
                        <ul>
                            <li>Home</li>
                            <li>Tutorials</li>
                            <li>Reviews</li>
                        </ul>
                        <button className="logIn" onClick={() => navigate("/login")}>Log In</button>
                        <button className="signUp" onClick={() => navigate("/signup")}>Sign Up</button>
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
                            <li onClick={() => navigate("/homepage")}>Home</li>
                            <li onClick={() => navigate("/reviews")}>Game Reviews</li>
                            <li onClick={() => navigate("/tutorials")}>Tutorials</li>
                            <li onClick={() => navigate("/forum")}>Community / Forum</li>
                        </ul>
                    </div>
                    <div className="right-footer">
                        <h1 className="right-footer-text">Quick Links</h1>
                        <ul className="right-footer-links">
                            <li onClick={() => navigate("/about")} className="aboutUs-link-footer">About Us</li>
                            <li onClick={() => navigate("/faq")} className="faqs-link-footer" >FAQs</li>
                            <li onClick={() => navigate("/terms")} className="terms-link-footer" >Terms and Conditions</li>
                            <li  onClick={() => navigate("/privacy")}className="privacy-link-footer">Privacy Policy</li>
                        </ul>
                    </div>
                </div>
                <div className="copyright-foot">
                    <h1 className="copyright-text">© 2024 RespawnPoint. All rights reserved.</h1>
                </div>
       </div>
    );
}

export default HomePage

// Aba figure out how to add icons
// Also make it responsive till 200px

// make other pages
