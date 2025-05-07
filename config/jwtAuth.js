const jwt = require("jsonwebtoken");
require("dotenv").config();

function getToken(req, res, next) {
  const bearerToken = req.headers["authorization"];

  if (typeof bearerToken !== "undefined") {
    const token = bearerToken.split(" ")[1];
    req.token = token;
  } else {
    req.auth = false;
  }

  next();
}

function verifyToken(req, res, next) {
  const token = req.token;
  const secret = process.env.ACCESS.TOKEN.SECRET;

  jwt.verify(token, secret, (error, data) => {
    if (error) {
      req.auth = false;
    } else {
      req.auth = true;
      console.log(data);
    }
  });

  next();
}

module.exports = { getToken, verifyToken };
