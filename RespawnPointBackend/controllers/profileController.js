const pool = require("../config/db"); // Adjust based on your setup

const getUserProfile = async (req, res) => {
  try {
    console.log("User from request:", req.user);

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized, user ID missing" });
    }

    const userId = req.user.id;
    console.log("Fetching profile for ID:", userId);

    // Fetch user/admin details
    const result = await pool.query('SELECT name, email, role FROM "Users" WHERE id = $1', [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = result.rows[0];
    console.log("Fetched user:", user);

    // Send role in response if needed
    res.json({ name: user.name, email: user.email, role: user.role });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Something went wrong while fetching the profile" });
  }
};


module.exports = { getUserProfile };
