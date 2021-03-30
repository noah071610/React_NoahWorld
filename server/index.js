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
const expiryDate = new Date(Date.now() + 60 * 60 * 1000);

// app.use((req, res, next) => {
//   res.locals.cspNonce = crypto.randomBytes(16).toString("hex");
//   next();
// });

// const cspOptions = {
//   directives: {
//     ...helmet.contentSecurityPolicy.getDefaultDirectives(),
//     "script-src": [
//       "'self'",
//       "https://www.googletagmanager.com",
//       "https://www.google-analytics.com",
//       "https://ssl.google-analytics.com",
//       "https://tagmanager.google.com",
//       "*.gstatic.com",
//       (req, res) => `'nonce-${res.locals.cspNonce}'`,
//     ],
//     "img-src": [
//       "'self'",
//       "www.googletagmanager.com",
//       "https://www.google-analytics.com",
//       "https://*.gstatic.com",
//       "https://www.gstatic.com",
//       "data:",
//     ],

//     "connect-src": ["'self'", "https://www.google-analytics.com"],
//   },
// };
// app.use(
//   helmet({
//     contentSecurityPolicy: cspOptions,
//   })
// );
// app.disable("x-powered-by");
// app.use(helmet.xssFilter());

dotenv.config();
app.use(cookieParser(process.env.COOKIE));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(
  express.json({
    limit: "1mb",
  })
);
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("trust proxy", 1);
app.use(
  session({
    name: process.env.SESSION_NAME,
    saveUninitialized: true,
    resave: false,
    secret: process.env.COOKIE,
    cookie: {
      // secure: true, 이놈은 https 할때
      httpOnly: true,
      expires: expiryDate,
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
