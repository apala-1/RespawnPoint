const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { User } = require("../models");
require("dotenv").config();

const router = express.Router();

// 🔹 Signup Route (Register New User)
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body; // name, email, and password

        if (!name || !email || !password) {
            return res.status(400).json({ error: "Name, email, and password are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "Email already in use" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user in the database
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "user", // Assuming default role is 'user'
        });

        // Generate JWT Token
        const token = jwt.sign({ id: newUser.id, role: newUser.role }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.status(201).json({ user: newUser, token });
    } catch (err) {
        console.error("Error in registration:", err);
        res.status(500).json({ error: err.message });
    }
});

// 🔹 Login Route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("Login request:", { email, password });

        // Use the correct table name ('Users') for Sequelize query
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        // Compare input password with stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Generate JWT Token
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });


        // 🔹 Return the user role in response
        res.json({ token, user: { id: user.id, email: user.email, role: user.role, name: user.name } });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// 🔹 Forgot Password Route
router.post('/request-reset-password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'Email not found' });
        }

        const resetToken = crypto.randomBytes(20).toString('hex');  // Corrected the parentheses error
        const resetTokenExpiration = Date.now() + 3600000;  // Token expires in 1 hour

        // Save the token and expiration time in the database
        await user.update({
            resetToken,
            resetTokenExpiration,
        });

        const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset Request',
            text: `Click this link to reset your password: ${resetLink}`,
        };

        // Send reset email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
                return res.status(500).send('Error sending email');
            }
            res.status(200).json({ message: 'Password reset email sent' });
        });
    } catch (error) {
        console.error("Error in request-reset-password route:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// 🔹 Reset Password Route
// Reset Password Route
router.post("/reset-password/:token", async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        const user = await User.findOne({ where: { resetToken: token } });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        // Ensure token has not expired
        if (user.resetTokenExpiration < Date.now()) {
            return res.status(400).json({ message: "Token has expired" });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password and clear reset token and expiration
        await user.update({
            password: hashedPassword,
            resetToken: null, // Clear reset token
            resetTokenExpiration: null, // Clear expiration
        });

        res.json({ message: "Password reset successful" });
    } catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).json({ message: "Server error" });
    }
});


module.exports = router;
