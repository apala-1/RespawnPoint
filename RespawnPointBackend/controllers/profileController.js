// Assuming you are using Sequelize, import the User model.
const { where } = require('sequelize');
const { User } = require('../models');  // Adjust the path based on your file structure

const getUserProfile = async (req, res) => {
  try {
    // The user ID is already decoded and available in req.user from the middleware
    const userId = req.user.id;
    console.log("User ID:", userId);
    
    // You can access the user data without querying the database if needed
    const userProfile = req.user;  // This is the data you added to req.user in the middleware

    res.json(userProfile);  // Return user profile data directly from the decoded token
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getUserProfile };

