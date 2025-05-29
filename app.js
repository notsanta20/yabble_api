const express = require("express");
const http = require("http");
const io = require("./socket");
const path = require("path");
const assetPath = path.join(__dirname, "public");
const cors = require("cors");
const router = require("./routes/route");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
io(server);

app.use(express.static(assetPath));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use(router);

module.exports = server;
