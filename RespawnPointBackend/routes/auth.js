const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { User } = require("../models");
require("dotenv").config();

const router = express.Router();

// 🔹 Signup Route (Register New User)
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

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
            password: hashedPassword
        });

        // Generate JWT Token
        const token = jwt.sign({ id: newUser.id, role: "user" }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.status(201).json({ user: newUser, token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 🔹 Login Route (Authenticate User or Admin)
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if admin is logging in
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1h" });

            return res.json({ 
                user: { email, role: "admin" }, 
                token 
            });
        }

        // Find user by email
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ error: "User not found" });

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        // Generate JWT Token
        const token = jwt.sign({ id: user.id, role: "user" }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.json({ token, user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 🔹 Forgot Password Route 
router.post('/request-reset-password', async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
        return res.status(404).json({ message: 'Email not found' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiration = Date.now() + 3600000; // 1 hour expiration time

    await user.update({ resetToken, resetTokenExpiration });

    const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset Request',
        text: `Click this link to reset your password: ${resetLink}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Error sending email');
        }
        res.json({ success: true, message: 'Password reset email sent' });
    });
});

// Route to reset password with the token
router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    const user = await User.findOne({ where: { resetToken: token } });

    if (!user || user.resetTokenExpiration < Date.now()) {
        return res.status(400).json({ message: 'Invalid or expired token' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await user.update({
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiration: null,
    });

    res.json({ success: true, message: 'Password reset successful' });
});

module.exports = router;
