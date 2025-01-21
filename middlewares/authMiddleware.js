const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res
      .status(403)
      .json({ message: "Access denied. No token provided." });
  }

  const tokenWithoutBearer = token.startsWith("Bearer ")
    ? token.slice(7)
    : token;

  // Verify the token
  jwt.verify(tokenWithoutBearer, process.env.secret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Access denied. Invalid token." });
    }

    req.user = user;
    next();
  });
};

module.exports = authenticateJWT;
