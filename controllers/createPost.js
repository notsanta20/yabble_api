const database = require("../database/databaseQueries");
const validateInputs = require("../config/validateInputs");
const { ZodError } = require("zod");
const { cloudinaryUpload } = require("../config/cloudinary");

async function createPost(req, res) {
  let { title, description } = req.body;
  let img = req.file;

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

  if (typeof description === "") {
    description = null;
  }

  if (typeof img === "undefined") {
    img = null;
  }

  try {
    const userId = req.user.id;
    let imgLink = null;

    const validData = validateInputs.validatePost({
      title: title,
      description: description,
    });

    if (validData) {
      throw validData;
    }

    if (img) {
      const b64 = Buffer.from(img.buffer).toString("base64");
      let dataURI = "data:" + img.mimetype + ";base64," + b64;
      imgLink = await cloudinaryUpload("post", userId, dataURI);
      imgLink = imgLink.url;
    }

    const post = await database.createPost(title, description, imgLink, userId);

    res.json({
      status: "success",
      message: "post added successfully",
      data: post,
    });
  } catch (error) {
    console.log(error);

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
