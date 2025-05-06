const database = require("../database/databaseQueries");

async function sendRequest(req, res) {
  const { requestId } = req.body;

  const id1 = "100b1539-21a7-40e2-8367-d3a271541c21";

  if (typeof requestId === "undefined") {
    res.status(400).json({
      status: "failed",
      message: "received invalid credentials",
      data: null,
    });
    return;
  }

  try {
    const verifyUser = await database.getSingleUser(requestId);

    if (!verifyUser) {
      res
        .status(400)
        .json({ status: "failed", message: "user does not exits", data: null });
      return;
    }

    const checkFriendsList = await database.checkFriendsList(id1, requestId);

    if (checkFriendsList) {
      res.status(403).json({
        status: "failed",
        message: "user is already available in the friends list",
        data: null,
      });
      return;
    }

    const checkRequest = await database.checkRequest(id1, requestId);

    if (checkRequest) {
      res.status(403).json({
        status: "failed",
        message: "friend request already sent",
        data: null,
      });
      return;
    }

    const data = await database.createRequest(id1, requestId);

    res.json({
      status: "success",
      message: "request sent successfully",
      data: data,
    });
  } catch (error) {
    res
      .status(503)
      .json({ status: "failed", message: "Internal server error", data: null });
  }
}

module.exports = sendRequest;
