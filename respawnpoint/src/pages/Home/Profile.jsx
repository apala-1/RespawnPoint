import { useEffect, useState } from "react";

const Profile = () => {
  const [profile, setProfile] = useState({ name: "", email: "", role: "" });
  const [message, setMessage] = useState(""); // State for message

  useEffect(() => {
    fetch('http://localhost:5000/api/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Ensure token is sent with the request
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error fetching profile: ${response.statusText}`);
        }
        return response.json();  // Parse the response JSON
      })
      .then((data) => {
        setProfile(data);  // Set the profile data if the request is successful
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        setMessage(error.message);  // Set the message for error state
      });
    

    fetch();
  }, []);

  return (
    <div>
      <h2>Profile</h2>
      {message && <p>{message}</p>} {/* Display message if exists */}
      <p>Name: {profile.name || "N/A"}</p>
      <p>Email: {profile.email || "N/A"}</p>
      <p>Role: {profile.role || "N/A"}</p> {/* Display the role (user/admin) */}
    </div>
  );
};

export default Profile;
