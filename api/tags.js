const express = require("express");
const tagsRouter = express.Router();

const { getAllTags } = require("../db");

tagsRouter.use((req, res, next) => {
  console.log("A requests is being made to /posts");

  next();
});

tagsRouter.get("/", async (req, res) => {
    try {
        const tags = await getAllTags();
        console.log(tags, 'tags log')
        res.send({ tags });
      } catch (error) {
        throw error;
      }
});

module.exports = tagsRouter;