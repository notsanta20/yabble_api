const jwt = require("jsonwebtoken");
require("dotenv").config();

function getUserDetails(token) {
  let userId, userName;
  let bearerToken = token.split(" ")[1];
  const secret = process.env.ACCESS_TOKEN_SECRET;

  jwt.verify(bearerToken, secret, (error, data) => {
    if (error) {
      userId = null;
      userName = null;
    } else {
      userId = data.user.id;
      userName = data.user.username;
    }
  });
  return { userId, userName };
}

module.exports = getUserDetails;
