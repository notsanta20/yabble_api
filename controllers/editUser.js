const database = require("../database/databaseQueries");

async function editUser(req, res) {
  const { bio } = req.body;

  if (!req.auth) {
    res.status(401).json({
      status: "unauthorized",
      message: "you are unauthorized, login.",
      auth: req.auth,
    });
    return;
  }

  if (typeof bio === "undefined") {
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
    await database.EditBio(userId, bio);

    res.json({
      status: "success",
      message: "User added to friends list",
      data: null,
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

module.exports = editUser;
