const express = require("express");
const app = express();
const message = require("../controllers/message");
const getMessage = require("../controllers/getMessage");

app.post("/message", message);
app.get("/message/:receiverId", getMessage);

module.exports = app;
