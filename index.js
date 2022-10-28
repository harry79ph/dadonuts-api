require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const auth = require("./routes/auth-routes");
const users = require("./routes/user-routes");
const PORT = process.env.PORT || 3500;
const USER_ROUTE = process.env.USER_ROUTE;

const app = express();

app.use(express.json());
app.use(cors({
  credentials: true,
  origin: [process.env.ORIGIN_URL],
  methods: ["GET", "POST"]
}));
app.use(cookieParser());

app.use(auth);
app.use(USER_ROUTE, users);

app.get("/", (req, res) => {
  res.send("server on");
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
