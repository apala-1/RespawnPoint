import React from "react";
import "./Privacy.css";

const Privacy = () => {
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
            <div className="title"><h1 className="h1">Privacy Policy</h1></div>
            
            <div className="privacy-container">
                <p><strong>1. Introduction</strong></p>
                <p>At Respawn Point, we respect your privacy and are committed to protecting your personal data. This policy outlines how we collect, use, and safeguard your information.</p>

                <p><strong>2. Information We Collect</strong></p>
                <ul>
                    <li>Personal details like name, email, and username during signup.</li>
                    <li>Game preferences and activity on our platform.</li>
                    <li>Usage data, including browser type, IP address, and interaction history.</li>
                </ul>

                <p><strong>3. How We Use Your Information</strong></p>
                <ul>
                    <li>To provide, personalize, and improve our services.</li>
                    <li>To communicate important updates, notifications, and promotional offers.</li>
                    <li>To maintain security and prevent fraud.</li>
                </ul>

                <p><strong>4. Data Sharing and Third Parties</strong></p>
                <ul>
                    <li>We do not sell or rent your personal data.</li>
                    <li>Data may be shared with third-party services for analytics, payment processing, and hosting.</li>
                    <li>We may disclose information when required by law or for security reasons.</li>
                </ul>

                <p><strong>5. Cookies and Tracking</strong></p>
                <ul>
                    <li>We use cookies to enhance user experience and analyze site performance.</li>
                    <li>You can disable cookies through your browser settings.</li>
                </ul>

                <p><strong>6. Security Measures</strong></p>
                <ul>
                    <li>We implement encryption and security protocols to protect user data.</li>
                    <li>Despite precautions, no online service is 100% secure, so users should take additional security steps.</li>
                </ul>

                <p><strong>7. Changes to Privacy Policy</strong></p>
                <p>We may update this policy periodically. Continued use of our services after updates means acceptance of the new terms.</p>
            </div>

        </div>
    );
}

export default Privacy;
