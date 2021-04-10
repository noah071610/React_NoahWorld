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
const helmet = require("helmet");
const hpp = require("hpp");
const expiryDate = new Date(Date.now() + 60 * 60 * 1000);

app.disable("x-powered-by");

dotenv.config();
app.use(cookieParser(process.env.COOKIE));

app.use(express.json());
app.use(
  express.json({
    limit: "1mb",
  })
);
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    name: process.env.SESSION_NAME,
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE,
    proxy: process.env.NODE_ENV === "production",
    cookie: {
      httpOnly: true,
      expires: expiryDate,
      secure: process.env.NODE_ENV === "production",
      domain: process.env.NODE_ENV === "production" && ".noahworld.site",
    },
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

if (process.env.NODE_ENV === "production") {
  app.enable("trust proxy", 1);
  app.use(morgan("combined"));
  app.use(hpp());
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(
    cors({
      origin: "https://noahworld.site",
      credentials: true,
    })
  );
  console.log("production on");
} else {
  app.use(morgan("dev"));
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
  console.log("production off");
}
app.use("/", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("Noah world");
});

app.get("/api", (req, res) => {
  res.send("Noah world API");
});

app.use("/api/post", require("./routes/post"));
app.use("/api/user", require("./routes/user"));
app.use("/api/comment", require("./routes/comment"));
app.use("/api/search", require("./routes/search"));
app.use("/api/quiz", require("./routes/quiz"));

app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "https://noahworld.site" }),
  function (req, res) {
    res.redirect("https://noahworld.site");
  }
);

const port = 5000;

app.listen(port, () => {
  console.log(`Server Listening on ${port}`);
});
