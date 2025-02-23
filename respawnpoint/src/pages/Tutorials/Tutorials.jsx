import React from "react";
import "./Tutorials.css";

const Tutorials = () => {
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
                        <a href="/signup"><button className="signUp">Sign Up</button></a>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                </div>
            </div>
            
            <div className="title"><h1 className="h1">Tutorials</h1></div>

            <div className="tutorial-section">
                <div className="tutorial-card" onClick={() => window.location.href='/minecraft-tutorials'}>
                    <img src="https://via.placeholder.com/150" alt="Minecraft" className="tutorial-thumbnail" />
                    <h2>Minecraft Tutorials</h2>
                </div>
                <div className="tutorial-card" onClick={() => window.location.href='/cod-tutorials'}>
                    <img src="https://via.placeholder.com/150" alt="Call of Duty" className="tutorial-thumbnail" />
                    <h2>Call of Duty Tutorials</h2>
                </div>
                <div className="tutorial-card" onClick={() => window.location.href='/fortnite-tutorials'}>
                    <img src="https://via.placeholder.com/150" alt="Fortnite" className="tutorial-thumbnail" />
                    <h2>Fortnite Tutorials</h2>
                </div>
            </div>
        </div>
    );
}

export default Tutorials;
