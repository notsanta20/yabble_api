const database = require("../database/databaseQueries");

async function getMessages(req, res) {
  const { receiverId } = req.params;
  const id1 = "100b1539-21a7-40e2-8367-d3a271541c21";
  const id2 = "c4ab95a0-2347-4901-8403-8415690b4a08";

  if (typeof receiverId === "undefined") {
    res.status(400).json({
      status: "failed",
      message: "received invalid credentials",
      data: null,
    });
    return;
  }

  try {
    const contact = await database.checkFriendsList(id1, receiverId);

    if (!contact) {
      res.status(403).json({
        status: "failed",
        message: "User is not in your friend list, send request to message",
      });
      return;
    }

    const data = await database.getMessages(contact);

    res.json({
      status: "success",
      message: "message fetched successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);

    res
      .status(503)
      .json({ status: "failed", message: "Internal server error", data: null });
  }
}

module.exports = getMessages;
