const express = require("express");
const router = express();
const authRoute = require("./authRoute");
const userRoute = require("./userRoute");
const messageRoute = require("./messageRoute");
const jwtAuth = require("../config/jwtAuth");

router.use("/", jwtAuth.getToken, jwtAuth.verifyToken);
router.use("/", authRoute);
router.use("/", userRoute);
router.use("/", messageRoute);

module.exports = router;
