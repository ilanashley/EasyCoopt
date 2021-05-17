var express = require('express');
var router = express.Router();

var uid2 = require("uid2");
var bcrypt = require("bcrypt");

var userModel = require("../models/users");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/*
  Sign-up
  Body: email (string), password (string)
  Response: result(true), isLogin(true), message(string), user(object)
*/

router.post('/sign-up', async (req, res, next) => {
  let confirmPassword = req.body.confirmPassword;
  let password = req.body.password;
  let email = req.body.email;
  var error = [];
  var result = false;
  var saveUser = null;
  var token = null;

  const data = await userModel.findOne({
    email: email,
  });

  if (data != null) {
    error.push("utilisateur déjà présent");
    res.json({ result, error});
  }

  if(!password || !confirmPassword || !email) {
    error.push("Champs vides");
    res.json({ result, error});
  } 
  
  if (password !== confirmPassword) {
    error.push("Mot de passe et confirmation différents");
    res.json({ result, error});
  } 
  
if ((error.length == 0)){
  var hash = bcrypt.hashSync(password, 10);
    var newUser = new userModel({
      email: email,
      password: password,
      password: hash,
      token: uid2(32),
    });
  
    saveUser = await newUser.save();

  if (saveUser) {
      result = true;
      token = saveUser.token;
  }

    res.json({ isLogin: true, result, user: saveUser, error, token });
  }
})

/*
  Sign-in
  Body: email (string), password (string)
  Response: result(true), isLogin(true), message(string), user(object)
*/

router.post('/sign-in', async (req, res, next) => {
  let email = req.body.email;
  var error = [];
  let result = false;
  let user = null;

  if(!req.body.password || !email) {
    error.push("Champs vides");
  } 
  if(error.length == 0) {
    user = await userModel.findOne({
      email: email,
    });

    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        result = true;
        token = user.token;
      } else {
        result = false;
        error.push("mot de passe incorrect");
      }
    } else {
      error.push("email incorrect");
    }
  }

  res.json({ result, user, error, token });
})

/*
  Account
  Body: firstName(string), lastName(string), avatarUrl(string), email(string), type(string), oldPassword(string), newPassword(string), confirmPassword(string)
  Response: result(true), message(string), user(object)
*/

router.post('/account', (req, res, next) => {
  let firstName = req.body.firstName
  let lastName = req.body.lastName
  let avatarUrl = req.body.avatarUrl
  let email = req.body.email
  let type = req.body.type
  let oldPassword = req.body.oldPassword
  let newPassword = req.body.newPassword
  let confirmPassword = req.body.confirmPassword
  if(!email || !type ) {
    res.json({ result: false, message: 'error'})
  } else {
    if (oldPassword) {
      if(oldPassword === 'azerty') {
        if ( !newPassword && !confirmPassword ) {
          res.json({ result: false, message: 'error' });
        } else if (!newPassword || !confirmPassword) {
          res.json({ result: false, message: 'error' });
        } else {
          if (newPassword !== confirmPassword) {
            res.json({ result: false, message: 'error' });
          } else {
            res.json({ result: true, isLogin: true, message:'success', user: {firstName, lastName, avatarUrl, email, type, newPassword} });
          }
        }
      } else {
        res.json({ result: false, message: 'error' });
      }
    } else {
      res.json({ result: true, isLogin: true, message:'success', user: {firstName, lastName, avatarUrl, email, type, oldPassword: 'azerty'} });
    }    
  }
})

module.exports = router;
