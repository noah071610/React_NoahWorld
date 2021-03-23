const express = require("express");
const bcrypt = require("bcrypt");
const app = express();
const { Post, User, Image, Hashtag, Comment, PostLike, SubComment } = require("../models");
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

router.get("/class", async (req, res) => {
  try {
    const classPosts_class = await Post.findAll({
      where: { category: "class" },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Hashtag,
          attributes: ["name"],
        },
        {
          model: User,
          as: "PostLikers",
          attributes: ["id"],
        },
      ],
    });
    const culturePosts_class = await Post.findAll({
      where: { category: "culture" },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Hashtag,
          attributes: ["name"],
        },
        {
          model: User,
          as: "PostLikers",
          attributes: ["id"],
        },
      ],
    });
    res.status(200).json({ classPosts_class, culturePosts_class });
  } catch (error) {
    console.error(error);
  }
});

router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
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
          include: [
            {
              model: User,
              attributes: ["id", "name", "icon"],
            },
            {
              model: User,
              as: "CommentLikers",
              attributes: ["id"],
            },
            {
              model: SubComment,
              include: [
                {
                  model: User,
                  attributes: ["id", "name", "icon"],
                },
              ],
            },
          ],
        },
        {
          model: User,
          as: "PostLikers",
          attributes: ["id"],
        },
      ],
    });
    if (!post) {
      return res.status(404).send("Not Found, please check PostId TT");
    }
    res.status(200).json({ post });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/sidePosts/:id/:category", async (req, res) => {
  try {
    const prevPost = await Post.findOne({
      order: [["id", "DESC"]],
      where: { id: { [Op.lt]: req.params.id }, category: req.params.category },
      attributes: ["id", "title"],
    });
    const nextPost = await Post.findOne({
      where: { id: { [Op.gt]: req.params.id }, category: req.params.category },
      attributes: ["id", "title"],
    });
    res.status(200).json({ prevPost, nextPost });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch("/like/:PostId/:UserId", async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.PostId } });
    if (!post) {
      return res.status(403).send("no post exist");
    }
    await post.addPostLikers(req.params.UserId);
    res.json({ PostId: post.id, UserId: req.params.UserId });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/like/:PostId/:UserId", async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.PostId } });
    if (!post) {
      return res.status(403).send("no post exist");
    }
    await post.removePostLikers(req.params.UserId);
    res.json({ PostId: post.id, UserId: req.params.UserId });
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
        {
          model: User,
          as: "PostLikers",
          attributes: ["id"],
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
        {
          model: User,
          as: "PostLikers",
          attributes: ["id"],
        },
      ],
    });
    // const classPosts = await Post.findAll({
    //   where: { category: "class" },
    //   order: [["createdAt", "DESC"]],
    //   include: [
    //     {
    //       model: Hashtag,
    //       attributes: ["name"],
    //     },
    //     {
    //       model: User,
    //       as: "PostLikers",
    //       attributes: ["id"],
    //     },
    //   ],
    // });
    // const culturePosts = await Post.findAll({
    //   where: { category: "culture" },
    //   order: [["createdAt", "DESC"]],
    //   include: [
    //     {
    //       model: Hashtag,
    //       attributes: ["name"],
    //     },
    //     {
    //       model: User,
    //       as: "PostLikers",
    //       attributes: ["id"],
    //     },
    //   ],
    // });
    const latestPost = await Post.findOne({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Hashtag,
          attributes: ["name"],
        },
        {
          model: User,
          as: "PostLikers",
          attributes: ["id"],
        },
      ],
    });
    const getAttributesFromPosts = await Post.findAll({
      order: [["createdAt", "DESC"]],
      attributes: ["id"],
      include: [
        {
          model: User,
          as: "PostLikers",
          attributes: ["id"],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["id"],
            },
          ],
        },
      ],
    }).then((result) =>
      result.map((v) => {
        return [v.id, v.PostLikers.length, v.Comments.length];
      })
    );
    const getLikes = await getAttributesFromPosts.map((v, i) => {
      return v[1];
    });
    const getComments = await getAttributesFromPosts.map((v, i) => {
      return v[2];
    });

    const mostCalculator = (arr, index) =>
      getAttributesFromPosts.filter((v) => {
        return v[index] === Math.max.apply(null, arr);
      });

    const mostLikedId = await mostCalculator(getLikes, 1)[0][0];
    const mostCommentsId = await mostCalculator(getComments, 2)[0][0];

    const mostLikedPost = await Post.findOne({
      where: {
        id: mostLikedId,
      },
      include: [
        {
          model: Hashtag,
          attributes: ["name"],
        },
        {
          model: User,
          as: "PostLikers",
          attributes: ["id"],
        },
      ],
    });
    const mostCommentedPost = await Post.findOne({
      where: {
        id: mostCommentsId,
      },
      include: [
        {
          model: Hashtag,
          attributes: ["name"],
        },
        {
          model: User,
          as: "PostLikers",
          attributes: ["id"],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["id"],
            },
          ],
        },
      ],
    });

    const hashtags = await Hashtag.findAll({
      attributes: ["name"],
    });
    res.status(200).json({
      techPosts,
      dailyPosts,
      // classPosts,
      // culturePosts,
      latestPost,
      mostLikedPost,
      mostCommentedPost,
      hashtags,
    });
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
      return;
    }
    if (req.body.password !== process.env.ADMIN_PASS) {
      res.status(401).send("Wrong Password");
      return;
    }
    const hashtags = await req.body.content.match(/#[^\s#+^<]+/g);
    const post = await Post.create({
      thumbnail: req.body.thumbnail,
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      UserId: req.body.UserId,
    });
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
    if (parseInt(req.body.UserId, 10) !== 1) {
      res.status(401).send("You are not a Admin");
      return;
    }
    if (req.body.password !== process.env.ADMIN_PASS) {
      res.status(401).send("Wrong Password");
      return;
    }
    req.body.tags &&
      req.body.tags.map((v) => {
        Hashtag.destroy({
          where: { name: v.name },
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
      { where: { id: parseInt(req.body.PostId, 10) } }
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
        where: { id: req.body.PostId },
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
    if (req.body.password !== process.env.ADMIN_PASS) {
      res.status(401).send("Wrong Password");
      return;
    }
    await Post.destroy({
      where: { id: req.body.PostId },
    });
    req.body.tags &&
      req.body.tags.map((v) => {
        Hashtag.destroy({
          where: { name: v.name },
        });
      });
    res.status(200).send({ success: true });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/category/:category", async (req, res) => {
  try {
    const category = req.params.category;
    const posts = await Post.findAll({
      where: { category: req.params.category },
      order: [["createdAt", "DESC"]],
      limit: 7,
      include: [
        {
          model: Hashtag,
          attributes: ["name"],
        },
        {
          model: User,
          as: "PostLikers",
          attributes: ["id"],
        },
      ],
    });
    res.status(200).json({ posts, category });
  } catch (error) {
    console.error(error);
  }
});

router.get("/morepost/:category", async (req, res) => {
  try {
    const category = req.params.category;
    let where = {};
    where = {
      id: { [Op.lt]: parseInt(req.query.lastId, 10) },
      $and: [{ category: req.params.category }],
    };
    const morePosts = await Post.findAll({
      where,
      limit: 10,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Hashtag,
          attributes: ["name"],
        },
        {
          model: User,
          as: "PostLikers",
          attributes: ["id"],
        },
      ],
    });
    res.status(200).json({ morePosts, category });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
