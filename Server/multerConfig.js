const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinaryConfig");

const profileStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "profile_pictures", 
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const postStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "post_images", 
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const uploadProfile = multer({ storage: profileStorage });
const uploadPost = multer({ storage: postStorage });

module.exports = { uploadProfile, uploadPost };
