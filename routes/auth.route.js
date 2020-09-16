const express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.render('authentication/login');
});


//router.post('/login',controller.postLogin);

module.exports = router;