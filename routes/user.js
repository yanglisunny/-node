const express = require('express');
const router = express.Router();

const UserController = require('../controller/user.js');

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/isLogin", UserController.isLogin);
router.get("/logout", UserController.logout);

module.exports = router;
