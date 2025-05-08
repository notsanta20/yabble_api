const express = require("express");
const app = express();
const getAllUsers = require("../controllers/getAllUsers");
const getUser = require("../controllers/getUser");
const sendRequest = require("../controllers/sendRequest");
const addFriend = require("../controllers/addFriend");
const getFriendRequests = require("../controllers/getFriendRequests");
const getFriendsList = require("../controllers/getFriendsList");
const getActiveUsers = require("../controllers/getActiveUsers");
const logoff = require("../controllers/logoff");

app.get("/all-users", getAllUsers);
app.get("/user/:userId", getUser);
app.post("/send-request", sendRequest);
app.get("/friend-requests", getFriendRequests);
app.post("/add-friend", addFriend);
app.get("/friends-list", getFriendsList);
app.get("/active-users", getActiveUsers);
app.put("/logoff", logoff);

module.exports = app;
