const database = require("../database/databaseQueries");

async function addFriend(req, res) {
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

    const request = await database.checkRequest(userId, receiverId);

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

    const data = await database.addFriend(userId, receiverId);

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
