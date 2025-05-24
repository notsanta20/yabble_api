const express = require("express");
const app = express();
const createPost = require("../controllers/createPost");
const getAllPosts = require("../controllers/getAllPosts");
const getPost = require("../controllers/getPost");
const postLike = require("../controllers/postLike");
const addComment = require("../controllers/addComment");
const uploads = require("../config/MulterUploads");

app.post("/create-post", uploads.single("img"), createPost);
app.get("/posts", getAllPosts);
app.get("/post/:postId", getPost);
app.put("/post/like", postLike);
app.put("/post/:postId/add-comment", addComment);

module.exports = app;
