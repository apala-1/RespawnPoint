import React from "react";
import "./featured.css";

const Featured = () => {
    return (
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
                        <a href="/signup"><button className="signUp">Sign Up</button></a>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                </div>
            </div>

            <div className="title"><h1 className="h1">Featured Games</h1></div>

            <div className="featured-section">
                <div className="featured-card" onClick={() => window.location.href='/game1'}>
                    <img src="https://via.placeholder.com/150" alt="Game 1" className="featured-thumbnail" />
                    <h2>Elden Ring</h2>
                </div>
                <div className="featured-card" onClick={() => window.location.href='/game2'}>
                    <img src="https://via.placeholder.com/150" alt="Game 2" className="featured-thumbnail" />
                    <h2>God of War</h2>
                </div>
                <div className="featured-card" onClick={() => window.location.href='/game3'}>
                    <img src="https://via.placeholder.com/150" alt="Game 3" className="featured-thumbnail" />
                    <h2>Cyberpunk 2077</h2>
                </div>
                <div className="featured-card" onClick={() => window.location.href='/game4'}>
                    <img src="https://via.placeholder.com/150" alt="Game 4" className="featured-thumbnail" />
                    <h2>Hollow Knight</h2>
                </div>
            </div>
        </div>
    );
}

export default Featured;