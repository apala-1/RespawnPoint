const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");

// Protected Admin Route
router.get("/admin-dashboard", adminAuth, (req, res) => {
    res.json({ message: "Welcome to the Admin Dashboard" });
});

module.exports = router;
