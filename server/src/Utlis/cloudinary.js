const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = (localFilePath) => {
  new Promise((resolve) => {
    // locaFilePath: path of image which was just
    // uploaded to "app-data/uploads" folder
    const mainFolderName = "main";
    // filePathOnCloudinary: path of image we want
    // to set when it is uploaded to cloudinary
    const filePathOnCloudinary = mainFolderName + "/" + localFilePath;

    cloudinary.uploader.upload(
      localFilePath,
      { public_id: filePathOnCloudinary },
      (result) => {
        fs.unlink(localFilePath, (err) => {
          if (err) {
            console.log("Error removeig file after successfull upload", err);
          }
          resolve({
            url: result.url,
            id: result.public_id,
          });
        });
      }
    );
  });
};
module.exports = {
  uploadToCloudinary: uploadToCloudinary,
};
