const multer = require("multer")
const upload = require("../middlewares/upload_middleware");

const handleUpload = (req, res, next) => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
        return res.status(413).json({ message: "file too large" });
      }
      return res.status(400).json({ message: "upload error" });
    }
    next();
  });
}

module.exports = {handleUpload}
