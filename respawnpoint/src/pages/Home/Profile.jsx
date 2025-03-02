import { useEffect, useState } from "react";
import "./Profile.css";

const Profile = () => {
  const [profile, setProfile] = useState({ name: "", email: "", role: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      setProfile({ name: user.name, email: user.email, role: user.role });
    } else {
      setMessage("Profile information is not available.");
    }
  }, []);

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h2 className="profile-title">Profile</h2>
        {message && <p className="profile-message">{message}</p>}
        <div className="profile-info">
          <p><span>Name:</span> {profile.name || "N/A"}</p>
          <p><span>Email:</span> {profile.email || "N/A"}</p>
          <p><span>Role:</span> {profile.role || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;