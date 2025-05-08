const database = require("../database/databaseQueries");

async function getAllPosts(req, res) {
  if (!req.auth) {
    res.status(401).json({
      status: "unauthorized",
      message: "you are unauthorized, login.",
      auth: req.auth,
    });
    return;
  }

  try {
    const allPosts = await database.getAllPosts();

    res.json({
      status: "success",
      message: "fetched all posts successfully",
      data: allPosts,
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

module.exports = getAllPosts;
