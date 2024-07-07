const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async function (req, res, next) {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const jwtSecret = process.env.JWT_SECRET || "default_secret_key";
      const decoded = jwt.verify(token, jwtSecret);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.error("Token verification error:", error);
      if (error.name === "JsonWebTokenError") {
        res.status(401).json({ message: "Invalid token" });
      } else if (error.name === "TokenExpiredError") {
        res.status(401).json({ message: "Token expired" });
      } else {
        res.status(401).json({ message: "Token verification failed" });
      }
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};
