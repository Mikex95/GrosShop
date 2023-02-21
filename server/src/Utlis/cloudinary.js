const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = (req, res, next) => {
  if (!req.file) {
    return next();
  }
  console.log({ req });
  const mainFolderName = "main";
  const filePathOnCloudinary = mainFolderName + "/" + req.file.path;

  cloudinary.uploader
    .upload(req.file.path, { public_id: filePathOnCloudinary })
    .then((result) => {
      // console.log({ result });
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.log("Error removeig file after successfull upload", err);
        }
        // res.locals.cloudinaryUrl = result.url;
        res.locals.cloudinaryUrl = result.url;
        next();
      });
    });
};
module.exports = {
  uploadToCloudinary: uploadToCloudinary,
};
