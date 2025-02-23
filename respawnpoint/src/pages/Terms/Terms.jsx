import React from "react";
import "./Terms.css";

const Terms = () => {
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
            <div className="title"><h1 className="h1">Terms and Conditions</h1></div>
            
            <div className="terms-container">
                <p><strong>1. Introduction</strong></p>
                <p>Welcome to Respawn Point! By accessing our website, you agree to abide by these terms and conditions.</p>

                <p><strong>2. User Accounts</strong></p>
                <ul>
                    <li>Users must provide accurate information during signup.</li>
                    <li>Account security is the responsibility of the user.</li>
                    <li>We reserve the right to suspend or delete accounts that violate our terms.</li>
                </ul>

                <p><strong>3. Content and Usage</strong></p>
                <ul>
                    <li>Users can post content but must ensure it is legal and does not infringe on copyrights.</li>
                    <li>Inappropriate content may be removed at our discretion.</li>
                </ul>

                <p><strong>4. Game Developer Submissions</strong></p>
                <ul>
                    <li>Game developers must go through a verification process before submitting content.</li>
                    <li>Content must adhere to ethical standards and copyright laws.</li>
                </ul>

                <p><strong>5. Privacy Policy</strong></p>
                <ul>
                    <li>We collect certain user data to improve our services.</li>
                    <li>User personal information is protected and not shared without consent.</li>
                </ul>

                <p><strong>6. Limitations of Liability</strong></p>
                <ul>
                    <li>Respawn Point is not responsible for any damages resulting from platform use.</li>
                    <li>We do not guarantee uninterrupted access to our services.</li>
                </ul>

                <p><strong>7. Changes to Terms</strong></p>
                <p>These terms may be updated periodically. Continued use of the platform constitutes acceptance of changes.</p>
            </div>

        </div>
    );
}

export default Terms;
