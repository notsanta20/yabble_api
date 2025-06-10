const multer = require("multer");
const storage = multer.memoryStorage();

const uploads = multer({
  storage: storage,
  limits: { fileSize: 5000000 },
});

module.exports = uploads;
