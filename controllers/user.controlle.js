const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports.loginPage = function (req, res) {
    res.render("users/login");
};

module.exports.registerPage = function(req, res){
    res.render('users/register');
}

module.exports.postRegister = async function (req, res) {
    const { userName, email, password, password2 } = req.body;
    let errs = [];
    //check required fields
    if (!userName || !email || !password || !password2) {
      errs.push({ msg: "Please fill in all." });
    }
  
    //check pass length
    if (password.length < 6) {
      errs.push({ msg: "Password should be at least 6 character" });
    }
  
    //check password match
    if (password !== password2) {
      errs.push({ msg: "Password do not match." });
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
      let checkUser = await userModel.findOne({
        userName: req.body.userName,
      });
      let checkEmail = await userModel.findOne({
        email: req.body.email,
      });
      if (!checkUser) {
        if (!checkEmail) {
          let newUser = new userModel({
            userName,
            email,
            password,
          });
  
          // hash password
          let hash = bcrypt.hashSync(newUser.password, saltRounds);
          newUser.password = hash;
          newUser = await newUser.save();
          res.redirect("/login");
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
};

module.exports.postLogin = async function (req, res) {
  const { userName, password } = req.body;
  let checkUser = await userModel.findOne({
    userName: userName,
  });

  if (checkUser == null) {
    return res.status(400).send("cannot find user");
  }
  try {
    if (await bcrypt.compare(password, checkUser.password)) {
      res.send("success");
    } else {
      res.render("users/login", {
        userName,
        password,
      });
    }
  } catch (error) {
    res.status(500).send();
  }
}