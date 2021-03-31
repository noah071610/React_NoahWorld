const express = require("express");
const router = express.Router();
const { Post, User, Image, Comment, Hashtag } = require("../models");
const { sequelize } = require("../models/index");
const { Op, QueryTypes } = require("sequelize");

router.post("/", async (req, res) => {
  try {
    if (req.body.keyword.length < 2) {
      res.status(401).json({ searchedKeyword: "need keyword more then 1 letter" });
    }
    const searchPosts = await sequelize.query(
      "SELECT * FROM portfolio_blog.posts WHERE title LIKE $1 or content Like $1",
      {
        bind: ["%" + req.body.keyword + "%"],
        type: QueryTypes.SELECT,
      }
    );
    res.status(200).json({ searchPosts, searchedKeyword: req.body.keyword });
  } catch (error) {
    console.error(error);
  }
});

router.get("/hashtag/:tag", async (req, res) => {
  try {
    const hashtagPosts = await Post.findAll({
      attributes: {
        exclude: ["thumbnail"],
      },
      include: [
        {
          model: Hashtag,
          where: { name: { [Op.eq]: req.params.tag } },
        },
      ],
    });
    res.status(200).json({ hashtagPosts });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
