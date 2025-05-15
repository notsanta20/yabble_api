const database = require("../database/databaseQueries");

async function getAllPosts(req, res) {
  const { postId } = req.params;

  if (!req.auth) {
    res.status(401).json({
      status: "unauthorized",
      message: "you are unauthorized, login.",
      auth: req.auth,
    });
    return;
  }

  if (typeof postId === "undefined") {
    res.status(400).json({
      status: "failed",
      message: "received invalid credentials",
      auth: req.auth,
    });
    return;
  }

  try {
    const userId = req.user.id;
    const post = await database.getPost(postId, userId);

    res.json({
      status: "success",
      message: "post fetched successfully",
      data: post,
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
