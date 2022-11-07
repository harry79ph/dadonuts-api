require("dotenv").config();
const jwt = require("jsonwebtoken");
const SECRET = process.env.TOKEN_SECRET;

const requireAuth = (req, res, next) => {
    const token = req.cookies["dadonuts-token"];
    if (!token) return res.json({ msg: "Please log in to your account" });
    jwt.verify(token, SECRET, (err, decodedToken) => {
        if (err) return res.json({ msg: err.message });
        if (decodedToken) {
            next();
        }
    });
};

module.exports = requireAuth;