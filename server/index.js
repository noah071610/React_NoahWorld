const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./models");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const passportConfig = require("./passport");
const passport = require("passport");
const morgan = require("morgan");

dotenv.config();
app.use(cookieParser(process.env.COOKIE));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE,
  })
);

passportConfig();
app.use(passport.initialize());
app.use(passport.session());

db.sequelize
  .sync()
  .then(() => {
    console.log("db connected");
  })
  .catch(console.error);

app.get("/", (req, res) => {
  res.send("Noah world");
});

app.get("/api", (req, res) => {
  res.send("Noah world API");
});

app.use("/api/post", require("./routes/post"));
app.use("/api/user", require("./routes/user"));
app.use("/api/comment", require("./routes/comment"));

app.use("/", express.static(path.join(__dirname, "uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Listening on ${port}`);
});
