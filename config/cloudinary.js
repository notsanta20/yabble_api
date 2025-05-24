const { v2 } = require("cloudinary");

v2.config({
  cloud_name: "dnhwtmeya",
  api_key: "561169522715425",
  api_secret: "FWvqNt28qDVgqb-dRBGo6-pjA4U",
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
