const database = require("../database/databaseQueries");

async function users(req, res) {
  const userId = req.user.id;

  if (!req.auth) {
    res.status(401).json({
      status: "unauthorized",
      message: "you are unauthorized, login.",
      auth: req.auth,
    });
    return;
  }

  try {
    const data = await database.getUsers(userId);

    const filteredData = data.filter((user) => {
      if (user.myFriends.length === 0 && user.followers.length === 0) {
        return user;
      }
    });

    res.json({
      status: "success",
      message: "all users",
      data: filteredData,
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

module.exports = users;
