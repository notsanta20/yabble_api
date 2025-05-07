const express = require("express");
const app = express();
const login = require("../controllers/login");
const signup = require("../controllers/signup");

app.post("/login", login);
app.post("/signup", signup);

module.exports = app;
