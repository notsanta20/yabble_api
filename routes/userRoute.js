const express = require("express");
const app = express();
const users = require("../controllers/users");
const sendRequest = require("../controllers/sendRequest");
const addFriend = require("../controllers/addFriend");
const getFriendRequests = require("../controllers/getFriendRequests");

app.get("/users", users);
app.post("/send-request", sendRequest);
app.get("/friend-requests", getFriendRequests);
app.post("/add-friend", addFriend);

module.exports = app;
