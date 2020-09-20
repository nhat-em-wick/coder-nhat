const express = require("express");
const useController = require('../controllers/user.controlle');

var router = express.Router();

// login page
router.get("/login", useController.loginPage);

// register page
router.get("/register", useController.registerPage );

// register post
router.post("/register", useController.postRegister);

//post login
router.post("/login", useController.postLogin);

module.exports = router;
