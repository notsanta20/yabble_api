const express = require("express");
const app = express();
const login = require("../controllers/login");

app.get("/login", login);

module.exports = app;
