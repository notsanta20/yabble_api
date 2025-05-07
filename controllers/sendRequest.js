const database = require("../database/databaseQueries");

async function sendRequest(req, res) {
  const { receiverId } = req.body;

  if (!req.auth) {
    res.status(401).json({
      status: "unauthorized",
      message: "you are unauthorized, login.",
      auth: req.auth,
    });
    return;
  }

  if (typeof receiverId === "undefined") {
    res.status(400).json({
      status: "failed",
      message: "received invalid credentials",
      data: null,
      auth: req.auth,
    });
    return;
  }

  try {
    const userId = req.user.id;
    const verifyUser = await database.getSingleUser(receiverId);

    if (!verifyUser) {
      res.status(400).json({
        status: "failed",
        message: "user does not exits",
        data: null,
        auth: req.auth,
      });
      return;
    }

    const checkFriendsList = await database.checkFriendsList(
      userId,
      receiverId
    );

    if (checkFriendsList) {
      res.status(403).json({
        status: "failed",
        message: "user is already available in the friends list",
        data: null,
        auth: req.auth,
      });
      return;
    }

    const checkRequest = await database.checkRequest(userId, receiverId);

    if (checkRequest) {
      res.status(403).json({
        status: "failed",
        message: "friend request already sent",
        data: null,
        auth: req.auth,
      });
      return;
    }

    const data = await database.createRequest(userId, receiverId);

    res.json({
      status: "success",
      message: "request sent successfully",
      data: null,
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
