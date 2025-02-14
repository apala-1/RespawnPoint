import React from "react";
import "./Forum.css";

const Forum = () => {
    return(
    // const menuIcon = document.getElementById("menuIcon");
    // const items = document.getElementById("items");

    // menuIcon.onclick = function(){
    //     console.log("Menu Icon Clicked!");
    //     items.classList.toggle("active");
    // }
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
            <div className="title"><h1 className="h1">Forum</h1></div>
            <div className="Games">
            </div>
        </div>
    );
}

export default Forum