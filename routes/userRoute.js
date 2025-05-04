const express = require("express");
const app = express();
const users = require("../controllers/users");
const sendRequest = require("../controllers/sendRequest");
const addFriend = require("../controllers/addFriend");

app.get("/users", users);
app.post("/send-request", sendRequest);
app.post("/add-friend", addFriend);

module.exports = app;
