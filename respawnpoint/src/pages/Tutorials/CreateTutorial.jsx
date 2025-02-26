import React, { useState } from 'react';

const CreateTutorial = () => {
  const [name, setName] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [tutorialText, setTutorialText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/tutorials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
      // Optionally, redirect to tutorials page
    } else {
      console.error("Error creating tutorial:", data.error);
      // Handle error here
    }
  };

  return (
    <div>
      <h2>Create a Tutorial</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tutorial Name"
          required
        />
        <input
          type="url"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          placeholder="YouTube URL"
          required
        />
        <textarea
          value={tutorialText}
          onChange={(e) => setTutorialText(e.target.value)}
          placeholder="Tutorial Text"
          required
        />
        <button type="submit">Create Tutorial</button>
      </form>
    </div>
  );
};

export default CreateTutorial;
