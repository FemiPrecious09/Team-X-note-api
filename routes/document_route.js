const express = require("express");
const { authorize} = require("../middlewares/auth");
const { uploadPdf } = require("../controllers/document_controller");

const { handleUpload } = require("../middlewares/errorhandler");
const router = express.Router()

router.post("/document", authorize, handleUpload,uploadPdf)

module.exports = router