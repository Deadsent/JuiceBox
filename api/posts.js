const express = require("express");
const postsRouter = express.Router();

const { getAllPosts } = require("../db");

postsRouter.use((req, res, next) => {
  console.log("A requests is being made to /posts");

  next();
});

postsRouter.get("/", async (req, res) => {
  try {
    const posts = await getAllPosts();
    res.send({ posts });
  } catch (error) {
    throw error;
  }
});

module.exports = postsRouter;