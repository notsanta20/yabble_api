const express = require("express");
const router = express();
const authRoute = require("./authRoute");
const userRoute = require("./userRoute");

router.use("/", authRoute);
router.use("/", userRoute);

module.exports = router;
