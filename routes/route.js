const express = require("express");
const router = express();
const authRoute = require("./authRoute");
const userRoute = require("./userRoute");
const messageRoute = require("./messageRoute");

router.use("/", authRoute);
router.use("/", userRoute);
router.use("/", messageRoute);

module.exports = router;
