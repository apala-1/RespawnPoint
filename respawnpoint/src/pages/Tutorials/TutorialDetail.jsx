import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './TutorialDetail.css';

const TutorialDetail = () => {
  const { id } = useParams();  // Get tutorial ID from URL parameters
  const [tutorial, setTutorial] = useState(null);

  useEffect(() => {
    const fetchTutorialDetail = async () => {
      const response = await fetch(`http://localhost:5000/api/tutorials/${id}`);
      const data = await response.json();
      setTutorial(data);
    };

    fetchTutorialDetail();
  }, [id]);

  // Function to safely extract the YouTube video ID from the URL
  const extractVideoId = (url) => {
    console.log('Extracting video ID from:', url);  // Log URL to inspect it
    try {
      // Check if the URL is from YouTube
      if (url.includes("youtube.com")) {
        const urlObj = new URL(url);
        const videoId = urlObj.searchParams.get("v");
        if (videoId) {
          return videoId;
        } else {
          throw new Error("No video ID found");
        }
      }
      // Check if it's a YouTube shortened URL
      else if (url.includes("youtu.be")) {
        const urlObj = new URL(url);
        const videoId = urlObj.pathname.split("/")[1];  // Extract the ID from the path
        if (videoId) {
          return videoId;
        } else {
          throw new Error("No video ID found");
        }
      }
      return null; // Return null if it's not a YouTube URL
    } catch (error) {
      console.error("Error extracting video ID:", error);
      return null;  // Return null if the URL is invalid or doesn't match expected patterns
    }
  };

  if (!tutorial) {
    return <div>Loading...</div>;  // Show loading message until tutorial is fetched
  }

  const videoId = extractVideoId(tutorial.youtube_url);

  return (
    <div className='tutorial-detail'>
      <h2>{tutorial.name}</h2>
      <p>{tutorial.tutorial_text}</p>

      {videoId ? (
        <iframe
        className='tutorial-video'
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
          allowFullScreen
          title={tutorial.name}
        ></iframe>
      ) : (
        <p className='loading'>Invalid YouTube URL</p>
      )}
    </div>
  );
};

export default TutorialDetail;
