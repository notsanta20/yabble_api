const database = require("../database/databaseQueries");

async function addFriend(req, res) {
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
    const checkFriendsList = await database.checkFriendsList(id1, requestId);

    if (checkFriendsList) {
      res.status(403).json({
        status: "failed",
        message: "user is already available in the friends list",
        data: null,
      });
      return;
    }

    const request = await database.checkRequest(id1, requestId);

    if (!request) {
      res.status(403).json({
        status: "failed",
        message: "send request to add user to friends list",
        data: null,
      });
      return;
    }

    await database.deleteRequest(request);

    const data = await database.addFriend(id1, requestId);

    res.json({
      status: "success",
      message: "User added to friends list",
      data: data,
    });
  } catch (error) {
    console.log(error);

    res
      .status(503)
      .json({ status: "failed", message: "Internal server error", data: null });
  }
}

module.exports = addFriend;
