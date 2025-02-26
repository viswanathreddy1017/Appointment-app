/*
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("Authorization");

  // Check if token exists
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    // Verify token (Remove "Bearer " before decoding)
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);

    // Set user in request
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error('Token verification error:', err.message); // Log the error message
    res.status(401).json({ msg: "Token is not valid" });
  }
};

*/