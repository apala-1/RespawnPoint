import React from "react";
import "./About.css";
import myPic from "../../assets/images/myPic.jpg";

const About = () => {
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
                </div>
            </div>
            
            <div className="title"><h1 className="h1">About Us</h1></div>
            
            <div className="about-container">
                <div className="about-image">
                    <img src={myPic} alt="Apala Lamichhane" />
                </div>
                <div className="about-content">
                    <h2>Who Am I?</h2>
                    <p>I'm Apala Lamichhane, a third-year Computing student at Softwarica College. Passionate about gaming and technology, I strive to create platforms that bring gamers together.</p>
                    <br />
                    <h2>What is Respawn Point?</h2>
                    <p>Respawn Point is a dedicated platform designed for gamers to share playthroughs, reviews, and tutorials. Our mission is to build a community where game enthusiasts can connect, learn, and grow together.</p>
                </div>
            </div>
        </div>
    );
}

export default About;