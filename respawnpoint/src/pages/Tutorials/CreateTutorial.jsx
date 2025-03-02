import React, { useState } from 'react';
import './createtutorial.css'; // Make sure to import the CSS
import { useNavigate } from 'react-router-dom';

const CreateTutorial = () => {
  const [name, setName] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [tutorialText, setTutorialText] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      console.log("Stored Token:", localStorage.getItem('token'));
      console.log(`Bearer ${token}`);
      
      if (!token) {
        console.error('No token found, user might not be logged in');
        return;
      }

      // Make the fetch request
      const response = await fetch('http://localhost:5000/api/tutorials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: name,           // Use 'name' here, not 'tutorialName'
          youtube_url: youtubeUrl,
          tutorial_text: tutorialText,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Reset form or handle success
        setName('');
        setYoutubeUrl('');
        setTutorialText('');
        // Optionally, redirect to tutorials page or show success message
        console.log('Tutorial created successfully:', data);
        navigate("/tutorials");
      } else {
        console.error("Error creating tutorial:", data.error);
        // Handle error here
      }
    } catch (error) {
      console.error("Error during tutorial creation:", error);
      // Handle the error here (e.g., show a user-friendly message)
    }
  };

  return (
    <div className="create-tutorial-container">
      <h2 className="create-tutorial-heading">Create a Tutorial</h2>
      <form className="create-tutorial-form" onSubmit={handleSubmit}>
        <div className="create-tutorial-input-container">
          <label className="create-tutorial-label" htmlFor="name">Tutorial Name</label>
          <input
            className="create-tutorial-input"
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Tutorial Name"
            required
          />
        </div>
        <div className="create-tutorial-input-container">
          <label className="create-tutorial-label" htmlFor="youtubeUrl">YouTube URL</label>
          <input
            className="create-tutorial-input"
            id="youtubeUrl"
            type="url"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            placeholder="Enter YouTube URL"
            required
          />
        </div>
        <div className="create-tutorial-input-container">
          <label className="create-tutorial-label" htmlFor="tutorialText">Tutorial Text</label>
          <textarea
            className="create-tutorial-textarea"
            id="tutorialText"
            value={tutorialText}
            onChange={(e) => setTutorialText(e.target.value)}
            placeholder="Enter Tutorial Text"
            required
          />
        </div>
        <button className="create-tutorial-button" type="submit">Create Tutorial</button>
      </form>
    </div>
  );
};

export default CreateTutorial;
