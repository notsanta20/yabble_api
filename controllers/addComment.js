const database = require("../database/databaseQueries");

async function addComment(req, res) {
  const { comment } = req.body;
  const { postId } = req.params;

  if (!req.auth) {
    res.status(401).json({
      status: "unauthorized",
      message: "you are unauthorized, login.",
      auth: req.auth,
    });
    return;
  }

  if (typeof postId === "undefined" || typeof comment === "undefined") {
    res.status(400).json({
      status: "failed",
      message: "received invalid credentials",
      auth: req.auth,
    });
    return;
  }

  try {
    const userId = req.user.id;
    const post = await database.addComment(comment, userId, postId);

    res.json({
      status: "success",
      message: "comment added successfully",
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

module.exports = addComment;
