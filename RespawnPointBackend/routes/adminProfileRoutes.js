const express = require("express");
const { getUserProfile } = require("../controllers/profileController");
const authenticateUser = require("../middleware/authenticateUser");

const router = express.Router();

router.get("/admin-profile", authenticateUser, (req, res) => {
  console.log("Admin Profile route accessed");
  getUserProfile(req, res);
});

module.exports = router;
