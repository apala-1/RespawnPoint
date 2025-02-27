import React, { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";  
import "./Reviews.css";

const Reviews = () => {
    const navigate = useNavigate();
    const [menuActive, setMenuActive] = useState(false);  // For toggling
     
    
        const handleLogout = () => {
            localStorage.removeItem("token"); // Remove JWT
            window.location.href = "/login"; // Redirect to login page
        };
    
        const toggleMenu = () => {
            setMenuActive(!menuActive); // Toggle active state
        };
  
    useEffect(() => {
      const fetchGames = async () => {
        try {
          const response = await axios.get("http://localhost:5000/api/games");
          console.log("Fetched games:", response.data); // ✅ Log the entire response
          setGames(response.data);
        } catch (error) {
          console.error("Error fetching games:", error);
        }
      };
    
      fetchGames();
    }, []);
    
  
    return (
      <div className="review-page">
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
  
            <div className="reviewtitle"><h1 className="h1">Reviews</h1></div>
            
            {/* New Review Section */}
            <div className="review-section">
                <div className="review-card">
                    <img src="https://via.placeholder.com/150" alt="Game Thumbnail" className="game-thumbnail" />
                    <div className="review-content">
                        <h2>Game Title</h2>
                        <p>This is a short review of the game. It includes details about gameplay, graphics, and overall experience.</p>
                        <button className="read-more">Read More</button>
                    </div>
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

export default Reviews;
