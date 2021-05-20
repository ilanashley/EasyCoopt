var express = require("express");
var router = express.Router();

var uid2 = require("uid2");
var bcrypt = require("bcrypt");

var userModel = require("../models/users");
const { findOne } = require("../models/users");

var uniqid = require('uniqid');
var fs = require('fs');

var cloudinary = require('cloudinary').v2;

let APkey = process.env.API_K;
let APsecret = process.env.API_S;

cloudinary.config({
  cloud_name: 'dyx38qkbh',
  api_key: APkey,
  api_secret: APsecret 
 });

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

/*
  Sign-up
  Body: email (string), password (string)
  Response: result(true), isLogin(true), message(string), user(object)
*/

router.post('/upload', async function(req, res, next) {
  var result = false;

  var pictureName = './tmp/'+uniqid()+'.jpg';
  var resultCopy = await req.files.avatar.mv(pictureName);

  if(resultCopy == undefined) {
    var result = true;
    var resultCloudinary = await cloudinary.uploader.upload(pictureName);
    res.json(resultCloudinary);
  } else {
    res.json({result});
  }

 });


/* ------POST for Sign-Up-------*/

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
      groupsId: "Coopteur",
      avatarUrl : "https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg",
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

  // On vérifie la saisie dans les champs indispensables email firstname lastname
  if(!email || email == 'undefined') {
    error.push(`Champ "Email" vide`);
  }
  if(!firstName || firstName == 'undefined') {
    error.push(`Champ "Prénom" vide`);
  }
  if(!lastName || lastName == 'undefined') {
    error.push(`Champ "Nom" vide`);
  }


/* Si l'utilisateur a entré un ancien mot de passe: */  
if (oldPassword){
        var oldPasswordhash = bcrypt.hashSync(oldPassword, 10);
        let checkPassword = bcrypt.compareSync(oldPasswordhash, user.password)

        if (checkPassword == false) {
              error.push(`"Ancien mot de passe" erroné`);
        }

      /* Vérification la presence de contenu sur les nouveau mot de passe */
        else if ( !newPassword) {
        error.push(`Champ "Nouveau mot de passe" vide`);
        } 
        else if (!confirmPassword) {
          error.push(`Champ "Ancien mot de passe" vide`);
        }
            /* Vérification du contenu des nouveaux mot de passe*/

        else if (newPassword !== confirmPassword) {
          error.push("Les ancien et nouveau mot de passe sont différents ");
        }}
  

  if (error.length == 0){
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
      });
 
  if (updatedUser != null){
    let newUserdata = await userModel.findOne({ token: token });
    res.json({ result, error, user: newUserdata });
  } }

else {
  res.json({ result, error })
}
});

module.exports = router;
