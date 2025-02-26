// Assuming you are using Sequelize, import the User model.
const { User } = require('../models/user');  // Adjust the path based on your file structure

const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;  // Extract user ID from the token
    
    const user = await User.findByPk(userId);  // Fetch user from the database

    if (!user) {
      return res.status(404).json({ message: "User not found." });  // Return 404 if user doesn't exist
    }

    res.json(user);  // Return the user profile
  } catch (error) {
    console.error("Error fetching user profile:", error);  // Log the error
    res.status(500).json({ message: "Internal Server Error" });  // Return 500 for unexpected errors
  }
};

module.exports = { getUserProfile };
