import React from "react";
import "./Forum.css";

const Forum = () => {
    const games = [
        { name: "Minecraft", image: "https://via.placeholder.com/200" },
        { name: "Call of Duty", image: "https://via.placeholder.com/200" },
        { name: "Cyberpunk 2077", image: "https://via.placeholder.com/200" },
        { name: "Elden Ring", image: "https://via.placeholder.com/200" },
        { name: "GTA V", image: "https://via.placeholder.com/200" },
        { name: "League of Legends", image: "https://via.placeholder.com/200" }
    ];

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

            <div className="title">
                <h1 className="h1">Forum</h1>
            </div>

            <div className="forum-container">
                <div className="game-list">
                    {games.map((game, index) => (
                        <div key={index} className="game-box">
                            <img src={game.image} alt={game.name} className="game-image" />
                            <p className="game-name">{game.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Forum;
