const database = require("../database/databaseQueries");
const validateInputs = require("../config/validateInputs");
const { ZodError } = require("zod");

async function createPost(req, res) {
  let { title, description, image } = req.body;

  if (!req.auth) {
    res.status(401).json({
      status: "unauthorized",
      message: "you are unauthorized, login.",
      auth: req.auth,
    });
    return;
  }

  if (typeof title === "undefined") {
    res.status(400).json({
      status: "failed",
      message: "Cannot create post with empty title",
      data: null,
      auth: req.auth,
    });
    return;
  }

  if (typeof description === "undefined") {
    description = null;
  }

  if (typeof image === "undefined") {
    image = null;
  }

  try {
    const userId = req.user.id;

    const validData = validateInputs.validatePost({
      title: title,
      description: description,
      image: image,
    });

    if (validData) {
      throw validData;
    }

    const post = await database.createPost(title, description, image);

    res.json({
      status: "success",
      message: "User added to friends list",
      data: post,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        status: "failed",
        message: "invalid inputs",
        data: error.issues,
        auth: req.auth,
      });
      return;
    }

    res.status(503).json({
      status: "failed",
      message: "Internal server error",
      data: error,
      auth: req.auth,
    });
  }
}

module.exports = createPost;
