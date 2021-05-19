var express = require("express");
var router = express.Router();

var uid2 = require("uid2");
var bcrypt = require("bcrypt");

var userModel = require("../models/users");
const { findOne } = require("../models/users");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

/*
  Sign-up
  Body: email (string), password (string)
  Response: result(true), isLogin(true), message(string), user(object)
*/

router.post("/sign-up", async (req, res, next) => {
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
    res.json({ result, error });
  }

  if (!password || !confirmPassword || !email) {
    error.push("Champs vides");
    res.json({ result, error });
  }

  if (password !== confirmPassword) {
    error.push("Mot de passe et confirmation différents");
    res.json({ result, error });
  }

  if (error.length == 0) {
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
});

/*
  Sign-in
  Body: email (string), password (string)
  Response: result(true), isLogin(true), message(string), user(object)
*/

router.post("/sign-in", async (req, res, next) => {
  let email = req.body.email;
  var error = [];
  let result = false;
  let user = null;

  if (!req.body.password || !email) {
    error.push("Champs vides");
  }
  if (error.length == 0) {
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
});

/*
  Account
  Body: firstName(string), lastName(string), avatarUrl(string), email(string), type(string), oldPassword(string), newPassword(string), confirmPassword(string)
  Response: result(true), message(string), user(object)
*/

router.get("/account", async function (req, res, next) {
  var user = await userModel.findOne({ token: req.query.token });

  if (user != null) {
    (password = user.password),
      (avatarUrl = user.avatarUrl),
      (email = user.email),
      (firstName = user.firstName),
      (lastName = user.lastName),
      (type = user.groupsId);
  }
  res.json({ password, avatarUrl, email, firstName, lastName, type });
});


router.post("/account", async (req, res, next) => {
  let result = false;
  let error = [];
  let user = await userModel.findOne({ token: req.body.token });

  if (user) {
    token = user.token;
  }

  /* renommage de tout du frontend */
  let avatarUrl = req.body.avatarUrl;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;
  let type = req.body.type;
  let oldPassword = req.body.oldPassword;
  let confirmPassword = req.body.confirmPassword;
  let newPassword = req.body.newPassword


/* Si l'utilisateur a entré un ancien mot de passe: */  
if (oldPassword){
  var oldPasswordhash = bcrypt.hashSync(oldPassword, 10);
  let checkPassword = bcrypt.compareSync(oldPasswordhash, user.password)

  if (checkPassword == false) {
         error.push("Ancien mot de passe erroné");
  }


/* Vérification la presence de contenu sur les nouveau mot de passe */
  if ( !newPassword && !confirmPassword ) {
  error.push("Champs vides");
  } 
  if (!newPassword || !confirmPassword) {
    error.push("Champs vides");
  }
      /* Vérification du contenu des nouveaux mot de passe*/

  else if (newPassword !== confirmPassword) {
    error.push("Ancien et nouveau mots de passe différents ");
  }}
  
  else {
          result = true;
    /* enregistrement de toutes les nouvelles infos en base de donnée */
    var updatedUser = await userModel.updateOne(
      { token: token },
      {
        avatarUrl: avatarUrl,
        email: email,
        firstName: firstName,
        lastName: lastName,
        groupsId: type,
      }
    );
        }
    res.json({ result, error });
});

module.exports = router;
