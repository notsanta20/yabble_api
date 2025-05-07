const database = require("../database/databaseQueries");

async function sendRequest(req, res) {
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
    const verifyUser = await database.getSingleUser(requestId);

    if (!verifyUser) {
      res.status(400).json({
        status: "failed",
        message: "user does not exits",
        data: null,
        auth: req.auth,
      });
      return;
    }

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

    const checkRequest = await database.checkRequest(userId, requestId);

    if (checkRequest) {
      res.status(403).json({
        status: "failed",
        message: "friend request already sent",
        data: null,
        auth: req.auth,
      });
      return;
    }

    const data = await database.createRequest(userId, requestId);

    res.json({
      status: "success",
      message: "request sent successfully",
      data: data,
      auth: req.auth,
    });
  } catch (error) {
    res.status(503).json({
      status: "failed",
      message: "Internal server error",
      data: null,
      auth: req.auth,
    });
  }
}

module.exports = sendRequest;
