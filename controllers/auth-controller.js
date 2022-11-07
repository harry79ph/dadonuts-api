require("dotenv").config();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.TOKEN_SECRET;

const expiresIn = 60 * 60 * 24;
const createToken = (id) => jwt.sign({ id }, SECRET, { expiresIn });

const checkUser = (req, res) => {
  const token = req.cookies["dadonuts-token"];
  if (!token) return res.json({ msg: "User not authorised" });
  jwt.verify(token, SECRET, async (err, decodedToken) => {
    if (err) {
      res.json({ msg: err.message });
    } else {
      try {
        const user = await User.findOne({ where: { uid: decodedToken.id} });
        if (user) {
          res.json({ name: user.dataValues.firstname, email: user.dataValues.email });
        } else {
          res.json({ msg: "No user found" });
        }
      } catch (error) {
        console.log(error);
        res.json({ msg: "Error finding that user" });
      }
    }
  });
};

const signup = async (req, res) => {
  const { email, password } = req.body;

  const users = await User.findAll();
  const exists = users.find(user => user.email === email);
  if (exists) return res.status(422).json({ errors: [{ msg: "This email already exists" }] });

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await User.create({ ...req.body, password: hashedPassword });
    res.json({ msg: "Registration successful!" });
  } catch (err) {
    console.log(err);
    res.json({ msg: "Database error" });
  }
}

const login = async (req, res) => {
  const { email, password } = req.body;

  const users = await User.findAll();
  const user = users.find((user) => user.email === email);
  if (!user) return res.status(422).json({ errors: [{ msg: "Invalid Credentials" }] });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(422).json({ errors: [{ msg: "Invalid Credentials" }] });
  
  const token = createToken(user.dataValues.uid);
  res.cookie("dadonuts-token", token, {
    maxAge: expiresIn * 1000,
    httpOnly: true,
    secure: true,
    sameSite: "None"
  });

  res.json({ name: user.dataValues.firstname, email: user.dataValues.email });
}

const updateUser = async (req, res) => {
  const { email, ...details } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(422).json({ errors: [{ msg: "User not found" }] });
  user.set(details);
  await user.save();
  
  res.json({ msg: "Contact details saved successfully!" });
}

const logout = (req, res) => {
  const token = req.cookies["dadonuts-token"];
  if (!token) return res.sendStatus(204);
  res.clearCookie("dadonuts-token", { httpOnly: true, secure: true, sameSite: "none" });
  res.json({ msg: "Cookie cleared" });
}

module.exports = {
  checkUser,
  signup,
  login,
  updateUser,
  logout
}