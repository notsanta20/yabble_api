const database = require("../database/databaseQueries");
const { cloudinaryUpload, deleteFolder } = require("../config/cloudinary");
const removeFile = require("../config/removeFile");

async function editUser(req, res) {
  const { bio } = req.body;
  let img = req.file;

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
    let imgLink = null;
    const userData = await database.getCurrentUser(userId);

    if (img) {
      if (userData.profilePic) {
        await deleteFolder(userId);
      }
      imgLink = await cloudinaryUpload("profile", userId, img.path);
      await removeFile(img.path);
    }
    await database.EditBio(userId, bio, imgLink.url);

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
