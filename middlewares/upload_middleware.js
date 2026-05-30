const multer = require("multer")

const MAX_FILE_SIZE = Number(process.env.MAX_FILE_SIZE_BYTES) || 25 * 1024 * 1024 // 25 MB

const upload = multer({
 storage: multer.memoryStorage(), 
 limits: { fileSize: MAX_FILE_SIZE }
})

module.exports = upload