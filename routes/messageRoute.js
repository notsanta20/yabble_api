const express = require("express");
const app = express();
const messages = require("../controllers/messages");
const getMessages = require("../controllers/getMessages");

app.post("/messages", messages);
app.get("/messages/:receiverId", getMessages);

module.exports = app;
