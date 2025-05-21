const database = require("../database/databaseQueries");

async function messages(req, res) {
  let { receiverId, message, image } = req.body;

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

  if (typeof message === "undefined" && typeof image === "undefined") {
    res.status(400).json({
      status: "failed",
      message: "Cannot send empty message",
      data: null,
      auth: req.auth,
    });
    return;
  }

  if (typeof message === "undefined") {
    message = null;
  }

  if (typeof image === "undefined") {
    image = null;
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

    const data = await database.createMessage(
      userId,
      receiverId,
      contact,
      message
    );

    res.json({
      status: "success",
      message: "message sent successfully",
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

module.exports = messages;
