const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const authenticateToken = async (req, res, next) => {
  const token = req.headers.authorization; // Extract token from cookies (or use headers)
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({ _id: decoded._id });
    if (!user) {
      throw new Error("User not found!!");
    }
    req.user = user;
    next(); // Call the next middleware or route handler
  } catch (err) {
    res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
  }
};

module.exports = authenticateToken;
