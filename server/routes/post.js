const express = require("express");
const bcrypt = require("bcrypt");
const app = express();
const { Post, User, Image, Hashtag, Comment } = require("../models");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { Op } = require("sequelize");

try {
  fs.accessSync("uploads");
} catch (error) {
  console.log("create new folder");
  fs.mkdirSync("uploads");
}

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".png" && ext !== ".mp4") {
      return cb(res.status(400).end("only jpg, png, mp4 is allowed"), false);
    }
    cb(null, true);
  },
});

const upload = multer({ storage: storage }).single("file");

const uploadThumbNail = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      done(null, basename + "_" + new Date().getTime() + ext);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
});

router.post("/uploadfiles", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename });
  });
});

router.post("/images", uploadThumbNail.array("image"), async (req, res, next) => {
  console.log(req.files);
  res.json(req.files.map((v) => v.filename));
});

router.get("/:category/:postId", async (req, res) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId, category: req.params.category },
      include: [
        {
          model: User,
          attributes: ["id", "name"],
        },
        {
          model: Hashtag,
          attributes: ["name"],
        },
        {
          model: Comment,
        },
      ],
    });
    const prevPost = await Post.findOne({
      order: [["id", "DESC"]],
      where: { id: { [Op.lt]: req.params.postId } },
      attributes: ["id", "title"],
    });
    const nextPost = await Post.findOne({
      where: { id: { [Op.gt]: req.params.postId } },
      attributes: ["id", "title"],
    });
    if (!post) {
      return res.status(404).send("Not Found, please check PostId TT");
    }
    res.status(200).json({ post, prevPost, nextPost });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const techPosts = await Post.findAll({
      where: { category: "tech" },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Hashtag,
          attributes: ["name"],
        },
      ],
    });
    const dailyPosts = await Post.findAll({
      where: { category: "daily" },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Hashtag,
          attributes: ["name"],
        },
      ],
    });
    const classPosts = await Post.findAll({
      where: { category: "class" },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Hashtag,
          attributes: ["name"],
        },
      ],
    });
    const culturePosts = await Post.findAll({
      where: { category: "culture" },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Hashtag,
          attributes: ["name"],
        },
      ],
    });
    const hashtags = await Hashtag.findAll({
      attributes: ["name"],
    });
    res.status(200).json({ techPosts, dailyPosts, classPosts, culturePosts, hashtags });
  } catch (error) {
    console.error(error);
  }
});

router.get("/hashtag/:hashtag", async (req, res, next) => {
  try {
    console.log(req.params.hashtag);
    const posts = await Post.findAll({
      limit: 5,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Hashtag,
          where: { name: decodeURIComponent(req.params.hashtag) },
        },
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
  }
});

router.post("/", async (req, res) => {
  try {
    if (parseInt(req.body.UserId, 10) !== 1) {
      res.status(401).send("You are not a Admin");
    }
    if (req.body.password !== process.env.ADMIN_PASS) {
      res.status(401).send("Wrong Password");
    }
    const hashtags = await req.body.content.match(/#[^\s#+^<]+/g);
    const post = await Post.create({
      thumbnail: req.body.thumbnail,
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      UserId: req.body.UserId,
    });
    console.log(hashtags);
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((tag) =>
          Hashtag.findOrCreate({
            where: { name: tag.slice(1).toLowerCase() },
          })
        )
      );
      await post.addHashtags(result.map((v) => v[0]));
    }
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
  }
});

router.post("/edit", async (req, res) => {
  try {
    req.body.tag &&
      req.body.tag.map((v) => {
        Hashtag.destroy({
          where: { name: v },
        });
      });
    const hashtags = req.body.content.match(/#[^\s#+^<]+/g);
    const newPost = await Post.update(
      {
        thumbnail: req.body.thumbnail,
        title: req.body.title,
        content: req.body.content,
        UserId: req.body.UserId,
      },
      { where: { id: req.body.postId } }
    );
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((tag) =>
          Hashtag.findOrCreate({
            where: { name: tag.slice(1).toLowerCase() },
          })
        )
      );
      const prevPost = await Post.findOne({
        where: { id: req.body.postId },
      });
      await prevPost.addHashtags(result.map((v) => v[0]));
    }
    res.status(201).send({ success: true });
  } catch (error) {
    console.error(error);
  }
});

router.post("/delete", async (req, res, next) => {
  try {
    await Post.destroy({
      where: { id: req.body.postId },
    });
    req.body.tag &&
      req.body.tag.map((v) => {
        Hashtag.destroy({
          where: { name: v },
        });
      });
    res.status(200).json({ PostId: parseInt(req.params.postId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
