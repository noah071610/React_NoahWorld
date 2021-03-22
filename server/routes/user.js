const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { Post, User, Image, Comment } = require("../models");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

try {
  fs.accessSync("uploads");
} catch (error) {
  console.log("create new folder");
  fs.mkdirSync("uploads");
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "server/uploads");
    },
    filename(req, file, done) {
      // someImageName.png
      const ext = path.extname(file.originalname); // 확장자 추출(.png)
      done(null, "icon_" + new Date().getTime() + ext); // someImageName15184712891.png      image name 지정
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});

// const upload = multer({ storage: storage }).single("file");

// const uploadIcon = multer({
//   storage: multer.diskStorage({
//     destination(req, file, done) {
//       done(null, "uploads");
//     },
//     filename(req, file, done) {
//       var imageBuffer = req.file.buffer;
//       var imageName = "uploads/map.png";
//       fs.createWriteStream(imageName).write(imageBuffer);
//     },
//   }),
//   limits: { fileSize: 20 * 200 * 200 },
// });

router.post("/icon", upload.single("image"), async (req, res, next) => {
  User.update({ icon: req.file.filename }, { where: { id: req.body.id } });
  res.json(req.file.filename);
});

router.get("/", async (req, res, next) => {
  try {
    if (req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: Comment,
          },
          {
            model: Post,
          },
          {
            model: Post,
            as: "Liked",
            attributes: ["id"],
          },
        ],
      });
      res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/logIn", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: Comment,
          },
          {
            model: Post,
          },
          {
            model: Post,
            as: "Liked",
            attributes: ["id"],
          },
        ],
      });
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

router.post("/logOut", async (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.send("log out done");
});

router.post("/signUp", async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exUser) {
      return res
        .status(403)
        .send({ success: false, message: "Your E-mail is already used, please Check one`s again" });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    await User.create({
      email: req.body.email,
      name: req.body.name,
      password: hashedPassword,
      icon: "default-user.png",
    });
    res.status(200).send({ success: true, message: "Save your ID well! Let`s Login :)" });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
