const { v2 } = require("cloudinary");
require("dotenv").config();

v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload an image

async function cloudinaryUpload(path, userId, file) {
  const location = `yabble/${path}/${userId}/`;

  const uploadResult = await v2.uploader
    .upload(file, {
      folder: location,
    })
    .catch((error) => {
      console.log(error);
    });

  return uploadResult;
}

async function deleteFolder(userId) {
  await v2.api.delete_resources_by_prefix(`yabble/profile/${userId}/`);
}

module.exports = { cloudinaryUpload, deleteFolder };
