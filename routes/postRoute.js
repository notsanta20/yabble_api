const express = require("express");
const app = express();
const createPost = require("../controllers/createPost");

app.post("/create-post", createPost);

module.exports = app;
