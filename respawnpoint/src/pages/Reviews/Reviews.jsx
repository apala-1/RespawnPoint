import React from "react";
import "./Reviews.css";

const Reviews = () => {
    return(
        <div className="entire-page">
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
                        <a href="/signup"> <button className="signUp">Sign Up</button></a>
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
                <button className="logIn"><a href="/login">Log In</a></button>
                <button className="signUp"><a href="/signup">Sign Up</a></button>
            </div>
            <div className="title"><h1 className="h1">Reviews</h1></div>
            
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
        </div>
    );
}

export default Reviews;
