const express = require("express");
const { loginUser, logoutUser, registerUser } = require("../controllers/auth_controller");
const router = express.Router()

router.post("/login", loginUser)
router.post("/logout", logoutUser)
router.post("/register", registerUser)

module.exports = router