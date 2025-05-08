const express = require("express");
const app = express();
const createPost = require("../controllers/createPost");
const getAllPosts = require("../controllers/getAllPosts");
const postLike = require("../controllers/postLike");
const addComment = require("../controllers/addComment");

app.post("/create-post", createPost);
app.get("/posts", getAllPosts);
app.put("/post/like", postLike);
app.put("/post/add-comment", addComment);

module.exports = app;
