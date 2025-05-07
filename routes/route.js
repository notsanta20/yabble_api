const express = require("express");
const router = express();
const authRoute = require("./authRoute");
const userRoute = require("./userRoute");
const messageRoute = require("./messageRoute");
const postRoute = require("./postRoute");
const jwtAuth = require("../config/jwtAuth");

router.use("/", jwtAuth.getToken, jwtAuth.verifyToken);
router.use("/", authRoute);
router.use("/", userRoute);
router.use("/", messageRoute);
router.use("/", postRoute);

module.exports = router;
