const database = require("../database/databaseQueries");

async function addFriend(req, res) {
  const { requestId } = req.body;
  const userId = req.user.id;

  if (!req.auth) {
    res.status(401).json({
      status: "unauthorized",
      message: "you are unauthorized, login.",
      auth: req.auth,
    });
    return;
  }

  if (typeof requestId === "undefined") {
    res.status(400).json({
      status: "failed",
      message: "received invalid credentials",
      data: null,
      auth: req.auth,
    });
    return;
  }

  try {
    const checkFriendsList = await database.checkFriendsList(userId, requestId);

    if (checkFriendsList) {
      res.status(403).json({
        status: "failed",
        message: "user is already available in the friends list",
        data: null,
        auth: req.auth,
      });
      return;
    }

    const request = await database.checkRequest(userId, requestId);

    if (!request) {
      res.status(403).json({
        status: "failed",
        message: "send request to add user to friends list",
        data: null,
        auth: req.auth,
      });
      return;
    }

    await database.deleteRequest(request);

    const data = await database.addFriend(userId, requestId);

    res.json({
      status: "success",
      message: "User added to friends list",
      data: data,
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

module.exports = addFriend;
