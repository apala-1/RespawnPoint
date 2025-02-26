import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";  // Import Link for navigation
import "./Tutorials.css";

const Tutorials = () => {
  const [tutorials, setTutorials] = useState([]);

  // Fetch tutorials from backend when component mounts
  useEffect(() => {
    const fetchTutorials = async () => {
      const response = await fetch('http://localhost:5000/api/tutorials');
      const data = await response.json();
      setTutorials(data);
    };
    fetchTutorials();
  }, []);

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

      <div className="title"><h1 className="h1">Tutorials</h1></div>

      {/* Add a button that links to the Create Tutorial page */}
      <div className="create-tutorial-btn">
        <Link to="/create-tutorial">
          <button className="create-btn">Create Tutorial</button>
        </Link>
      </div>

      <div className="tutorial-section">
        {tutorials.map((tutorial) => (
          <div key={tutorial.id} className="tutorial-card">
            {/* Link to the TutorialDetail page with tutorial id */}
            <Link to={`/tutorials/${tutorial.id}`}>
              <h2>{tutorial.name}</h2>
            </Link>

            {/* Button to navigate to Update Tutorial page */}
            <Link to={`/tutorials/update/${tutorial.id}`}>
              <button>Update Tutorial</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tutorials;
