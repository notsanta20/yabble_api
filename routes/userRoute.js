const express = require("express");
const app = express();
const getAllUsers = require("../controllers/getAllUsers");
const getUser = require("../controllers/getUser");
const sendRequest = require("../controllers/sendRequest");
const addFriend = require("../controllers/addFriend");
const getFriendRequests = require("../controllers/getFriendRequests");

app.get("/all-users", getAllUsers);
app.get("/user/:userId", getUser);
app.post("/send-request", sendRequest);
app.get("/friend-requests", getFriendRequests);
app.post("/add-friend", addFriend);

module.exports = app;
