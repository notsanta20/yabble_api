const database = require("../database/databaseQueries");

async function postLike(req, res) {
  const { postId } = req.body;

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
    const verifyLike = await database.checkLike(userId, postId);

    if (verifyLike) {
      const removeLike = await database.removeLike(verifyLike.id);

      res.json({
        status: "success",
        message: "like removed successfully",
        data: removeLike,
      });
      return;
    }

    const addLike = await database.addLike(userId, postId);

    res.json({
      status: "success",
      message: "like added successfully",
      data: addLike,
    });
  } catch (error) {
    console.log(error);

    res.status(503).json({
      status: "failed",
      message: "Internal server error",
      data: error,
      auth: req.auth,
    });
  }
}

module.exports = postLike;
