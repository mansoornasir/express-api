const { response } = require("express");
const express = require("express");
const articleRoute = express.Router();
const Article = require("../models/Article");
const auth = require("./verifyToken");

articleRoute.get("/", auth, async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (err) {
    console.log(err);
  }
});

articleRoute.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const saveRes = await Article.create({
      title: req.body.title,
      author: req.body.author,
      details: req.body.details,
    });
    res.send(saveRes);
  } catch (err) {
    console.log(err);
  }
});

articleRoute.patch("/:id", async (req, res) => {
  try {
    const updatedArticle = await Article.updateOne(
      { _id: req.params.id },
      {
        $set: { title: req.body.title },
      },
      {
        $set: { author: req.body.author },
      },
      {
        $set: { details: req.body.details },
      }
    );
    console.log(updatedArticle);
    res.send(updatedArticle);
  } catch (err) {
    console.log(err);
  }
});

articleRoute.delete("/:id", async (req, res) => {
  try {
    const deletedArticle = await Article.findByIdAndDelete(req.params.id);
    res.send(deletedArticle);
  } catch (err) {
    console.log(err);
  }
});

module.exports = articleRoute;
