const fs = require("fs");
const { promisify } = require("util");

const unlinkAsync = promisify(fs.unlink);

async function removeFile(path) {
  await unlinkAsync(path);
}

module.exports = removeFile;
