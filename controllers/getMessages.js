const database = require("../database/databaseQueries");

async function getMessages(req, res) {
  const { receiverId } = req.params;

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
    const contact = await database.checkFriendsList(userId, receiverId);

    if (!contact) {
      res.status(403).json({
        status: "failed",
        message: "User is not in your friend list, send request to message",
        auth: req.auth,
      });
      return;
    }

    const data = await database.getMessages(contact);

    res.json({
      status: "success",
      message: "message fetched successfully",
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

module.exports = getMessages;
