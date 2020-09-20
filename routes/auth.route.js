const express = require('express');
var router = express.Router();
const userModel =require('../models/user.model');

router.get('/', function(req, res){
    res.render('authentication/login');
});


router.post('/', async function(req, res){
    var userName = req.body.userName;
    var password = req.body.password;
    var user = await userModel.find({ userName: userName });
    

});

module.exports = router;