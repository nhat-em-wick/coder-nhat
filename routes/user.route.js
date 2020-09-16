const express = require("express");
const userModel = require("../models/user.model");
const bcrypt = require('bcrypt');
const saltRounds = 10;

var router = express.Router();

// login page
router.get("/login", function (req, res) {
  res.render("users/login");
});

// register page
router.get("/register", function (req, res) {
  res.render("users/register");
});

// register post
router.post("/register", async function (req, res) {
  const { userName, email, password, password2 } = req.body;
  let errs = [];
  //check required fields
  if (!userName || !email || !password || !password2) {
    errs.push({ msg: "Please fill in all." });
  }

  //check password match
  if (password !== password2) {
    errs.push({ msg: "Password do not match." });
  }

  //check pass length
  if (password.length < 6) {
    errs.push({ msg: "Password should be at least 6 character" });
  }

  if (errs.length > 0) {
    res.render("users/register", {
      errs,
      userName,
      email,
      password,
      password2,
    });
  } else {
    // validation user
    let checkUserName = await userModel.findOne({
      userName: req.body.userName,
    });
    let checkEmail = await userModel.findOne({ email: req.body.email });
    if (!checkUserName) {
      if (!checkEmail) {
        let newUser = new userModel({
          userName, email, password
        });

        // hash password
        let hash = bcrypt.hashSync(newUser.password, saltRounds);
        newUser.password = hash;
        newUser = await newUser.save();
        res.redirect('/users/login');

      } else {
        errs.push({ msg: "Email is already register" });
        res.render("users/register", {
          errs,
          userName,
          email,
          password,
          password2,
        });
      }
    } else {
      errs.push({ msg: "User Name is already register" });
      res.render("users/register", {
        errs,
        userName,
        email,
        password,
        password2,
      });
    }
  }
});

module.exports = router;
