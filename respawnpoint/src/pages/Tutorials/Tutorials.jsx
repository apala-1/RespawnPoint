import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./Tutorials.css";

const Tutorials = () => {
  const [tutorials, setTutorials] = useState([]);
  const navigate = useNavigate();
  const [menuActive, setMenuActive] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove JWT
    window.location.href = "/login"; // Redirect to login page
  };

  const toggleMenu = () => {
    setMenuActive(!menuActive); // Toggle active state
  };

  const getLoggedInUserId = () => {
    // Get the user data from localStorage (assuming it's stored as an object)
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      return user.id; // Access the 'id' field directly from the stored object
    }
    return null; // Return null if no user data is found
  };
  

  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/tutorials");

        // Check if the response is OK (status 200)
        if (!response.ok) {
          console.error('Error fetching tutorials:', response.status, response.statusText);
          return;
        }

        // Attempt to parse the response as JSON
        const data = await response.json();
        setTutorials(data);
      } catch (error) {
        console.error("Error fetching tutorials:", error); // Log any errors
      }
    };
    fetchTutorials();
  }, []);

  return (
    <div className="tutorial-page">
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
              onClick={toggleMenu} // Add the toggle functionality here
            >
              =
            </div>
          </div>
        </div>
      </div>

      <div className={`restPage ${menuActive ? "active" : ""}`}>
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
      <div className="tutorialtitle">
        <h1 className="h1">Tutorials</h1>
      </div>

      {/* Add a button that links to the Create Tutorial page */}
      <div className="create-tutorial-btn">
        <Link to="/create-tutorial">
          <button className="create-btn">Create Tutorial</button>
        </Link>
      </div>

      <div className="tutorial-section">
      {tutorials.length > 0 ? (
  tutorials.map((tutorial) => {
    const loggedInUserId = getLoggedInUserId();
    console.log(loggedInUserId);
    console.log(tutorial.user_id);
    return (
      <div key={tutorial.id} className="tutorial-card">
        {/* Link to the TutorialDetail page with tutorial id */}
        <a href={`/tutorials/${tutorial.id}`} className="tutorial-link">
          <h2>{tutorial.name}</h2>
        </a>

        {/* Conditionally render Update button if the logged-in user is the tutorial creator */}
        {loggedInUserId === tutorial.user_id && (
          <Link to={`/tutorials/update/${tutorial.id}`}>
            <button className="updateBtn">Update Tutorial</button>
          </Link>
        )}
              </div>
            );
          })
        ) : (
          <p>No tutorials available.</p> // Display a message if no tutorials are found
        )}
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

export default Tutorials;
