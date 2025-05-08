const database = require("../database/databaseQueries");

async function getFriendsList(req, res) {
  if (!req.auth) {
    res.status(401).json({
      status: "unauthorized",
      message: "you are unauthorized, login.",
      auth: req.auth,
    });
    return;
  }

  try {
    const userId = req.user.id;
    const data = await database.getFriendsList(userId);

    res.json({
      status: "success",
      message: "successfully fetched friends list",
      data: data,
      auth: req.auth,
    });
  } catch (error) {
    console.log(error);

    res.status(503).json({
      status: "failed",
      message: "Internal server error",
      data: null,
      auth: req.auth,
    });
  }
}

module.exports = getFriendsList;
