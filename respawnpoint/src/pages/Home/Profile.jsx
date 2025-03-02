import { useEffect, useState } from "react";

const Profile = () => {
  const [profile, setProfile] = useState({ name: "", email: "", role: "" });
  const [message, setMessage] = useState(""); // State for message

  useEffect(() => {
    // Retrieve the profile information from localStorage
    const user = JSON.parse(localStorage.getItem("user"));  // Get the user object from localStorage

    if (user) {
      setProfile({ name: user.name, email: user.email, role: user.role });  // Set profile with user data
    } else {
      setMessage("Profile information is not available.");  // Display a message if user is not found
    }
  }, []);   // Empty dependency array means this effect runs only once when the component is mounted.

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
