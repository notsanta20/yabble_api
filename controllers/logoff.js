const database = require("../database/databaseQueries");

async function logoff(req, res) {
  if (!req.auth) {
    res.status(401).json({
      status: "unauthorized",
      message: "you are already logged off.",
      auth: req.auth,
    });
    return;
  }

  try {
    const userId = req.user.id;
    const user = await database.setOffline(userId);

    res.json({
      status: "success",
      message: "logged off successfully",
      data: user,
    });
  } catch (error) {
    res.status(503).json({
      status: "failed",
      message: "Internal server error",
      data: error,
      auth: req.auth,
    });
  }
}

module.exports = logoff;
