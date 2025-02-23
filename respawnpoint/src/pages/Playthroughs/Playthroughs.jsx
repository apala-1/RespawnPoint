import React from "react";
import "./Playthroughs.css";

const Playthroughs = () => {
    const games = [
        { name: "The Witcher 3", image: "https://via.placeholder.com/200" },
        { name: "Dark Souls III", image: "https://via.placeholder.com/200" },
        { name: "Hollow Knight", image: "https://via.placeholder.com/200" },
        { name: "Red Dead Redemption 2", image: "https://via.placeholder.com/200" },
        { name: "God of War", image: "https://via.placeholder.com/200" },
        { name: "Sekiro: Shadows Die Twice", image: "https://via.placeholder.com/200" }
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
                <h1 className="h1">Playthroughs</h1>
            </div>

            <div className="playthrough-container">
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

export default Playthroughs;
