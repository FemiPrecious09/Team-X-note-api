const express = require("express");
const multer = require("multer");
const { authorize } = require("../middlewares/auth");
const {
  listDocuments,
  getDocument,
  uploadDocument,
  deleteDocument,
} = require("../controllers/document_controller");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE_BYTES) || 10 * 1024 * 1024,
  },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === "application/pdf") return cb(null, true);
    cb(new Error("Only PDF files are allowed"));
  },
});

router.get("/", authorize, listDocuments);
router.get("/:id", authorize, getDocument);
router.post("/", authorize, upload.single("file"), uploadDocument);
router.delete("/:id", authorize, deleteDocument);

router.use((err, req, res, next) => {
  if (err.message === "Only PDF files are allowed") {
    return res.status(415).json({ message: err.message });
  }
  if (err.code === "LIMIT_FILE_SIZE") {
    return res
      .status(413)
      .json({ message: "File exceeds maximum allowed size" });
  }
  next(err);
});

module.exports = router;
