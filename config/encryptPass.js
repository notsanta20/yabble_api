const crypto = require("crypto");

function getHash(username, password) {
  const userInfo = `${username}:${password}`;
  const salt = crypto.randomBytes(32).toString("hex");

  const hash = crypto
    .pbkdf2Sync(userInfo, salt, 1000, 64, "sha512")
    .toString("hex");

  return { salt, hash };
}

function validateHash(username, password, salt, hash) {
  const userInfo = `${username}:${password}`;
  const verifyHash = crypto
    .pbkdf2Sync(userInfo, salt, 1000, 64, "sha512")
    .toString("hex");

  return hash === verifyHash;
}

module.exports = { getHash, validateHash };
