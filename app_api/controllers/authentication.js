const passport = require('passport');
const mongoose = require('mongoose');
require('../models/user.js'); // Ensure the user model is loaded
const User = mongoose.model('users');

// Register function
const register = async (req, res) => {
    try {
        // Validate required fields
        if (!req.body.name || !req.body.email || !req.body.password) {
            return res.status(400).json({ message: "All fields required" });
        }

        // Create and configure new user
        const user = new User();
        user.name = req.body.name;
        user.email = req.body.email;
        user.setPassword(req.body.password);

        // Save the user
        await user.save();

        // Generate JWT and respond
        const token = user.generateJwt();
        res.status(200).json({ token });
    } catch (err) {
        console.error("Registration Error:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

// Login function
const login = async (req, res) => {
    try {
        // Validate required fields
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({ message: "All fields required" });
        }

        // Authenticate using Passport
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                console.error("Authentication Error:", err);
                return res.status(500).json({ message: "Internal server error", error: err.message });
            }

            if (user) {
                const token = user.generateJwt();
                return res.status(200).json({ token });
            } else {
                return res.status(401).json({ message: info ? info.message : "Authentication failed" });
            }
        })(req, res);
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

// Export functions
module.exports = {
    register,
    login,
};