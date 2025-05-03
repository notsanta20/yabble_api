const express = require("express");
const app = express();
const allUsers = require("../controllers/allUsers");

app.get("/allUsers", allUsers);

module.exports = app;
