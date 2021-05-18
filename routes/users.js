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

router.post('/account', async(req, res, next) => {
  let result = false;
  let error = [];
  let user = await userModel.findOne({token: req.body.token});

if(user){
  token = user.token;
}
console.log('le user-->', user)

/* renommage de tout du frontend */
  let avatarUrl = req.body.avatarUrl
  let firstName = req.body.firstName
  let lastName = req.body.lastName
  let email = req.body.email
  let type = req.body.type
  let oldPassword = req.body.oldPassword
  let newPassword = req.body.newPassword
  let confirmPassword = req.body.confirmPassword


// vérifier si il y a du contenu en frontend, si il n'y a pas de contenu en frontend le contenu est égal à ce qu'il y avait en BD


  console.log('le token-->', token)
  console.log('le password -->', newPassword)


  var updatedUser =  await userModel.updateOne({token: token}, {password: newPassword, avatarUrl: avatarUrl, email: email, firstName: firstName, lastName: lastName, groupsId: type});
  res.json({result: true});

})

module.exports = router;
