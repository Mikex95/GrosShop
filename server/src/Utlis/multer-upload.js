const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // cb(null, path.join(__dirname, "../app-data/uploads"));
    cb(null, "app-data/uploads");
  },
  filename: (req, file, cb) => {
    const fileExtention = file.originalname.substring(
      file.originalname.lastIndexOf("."),
      file.originalname.length
    );
    const filename = file.originalname
      .replace(" ", "-")
      .substring(0, file.originalname.lastIndexOf("."));
    // const finalName = `${filename}__${Date.now()}__${fileExtention}`;
    const finalName = `${filename}__${new Date().toISOString()}__${fileExtention}`;
    cb(null, finalName);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const multerUpload = multer({
  storage: storage,
  fileFilter: fileFilter,
  // limits: { fileSize :1024*1024},
});
module.exports = { multerUpload: multerUpload };
