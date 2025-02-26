/*
const express = require("express");
const auth = require("../middleware/auth"); // Middleware to verify JWT token
const User = require("../models/User");

const router = express.Router();

// @route   GET api/profile
// @desc    Get user profile
// @access  Private (Requires authentication)
router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password"); // Exclude password from response
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;

*/