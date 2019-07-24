const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../users/users-model.js");
const secrets = require("../config/secrets");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  const jwtSecret = process.env.JWT_SECRET || "kep it secret, keep it safe";

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ error: "You shall not pass." });
      } else {
        req.jwtToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({ error: "No token provided." });
  }
};
