const express = require("express");
const { getUserProfile } = require("../controllers/profileController");
const authenticateUser = require("../middleware/authenticateUser");

const router = express.Router();

router.get("/profile", authenticateUser, (req, res) => {
  console.log("🔹 Profile route accessed!");
  getUserProfile(req, res);
});





module.exports = router;
