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

router.post('/upload', async function (req, res, next) {
  var result = false;

  var pictureName = './tmp/' + uniqid() + '.jpg';
  var resultCopy = await req.files.avatar.mv(pictureName);

  if (resultCopy == undefined) {
    var result = true;
    var resultCloudinary = await cloudinary.uploader.upload(pictureName);
    fs.unlinkSync(pictureName)
    res.json(resultCloudinary);
  } else {
    res.json({ result });
  }

});

/*
  Sign-up
  Body: email (string), password (string), confirPassword (string)
  Response: result(bool), error(string), user(object)
*/

router.post('/sign-up', async (req, res, next) => {
  let confirmPassword = req.body.confirmPassword
  let password = req.body.password
  let email = req.body.email
  if (!password || !confirmPassword || !email) {
    res.json({ result: false, error: 'Veuillez remplir tous les champs' });
  } else if (password !== confirmPassword) {
    res.json({ result: false, error: 'Les mots de passe ne correspondent pas, veuillez les ressaisir' });
  } else {
    const data = await userModel.findOne({
      email: email,
    });
    if (data) {
      res.json({ result: false, error: 'Utilisateur déjà présent' });
    } else {
      var hash = bcrypt.hashSync(password, 10);
      var newUser = new userModel({
        email: email,
        password: password,
        password: hash,
        token: uid2(32),
        groupsId: "Coopteur",
        avatarUrl: "https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg",
      });

      user = await newUser.save();
      if(!user) {
        res.json({ result: false, error: "L'utilisateur n'a pas pu être enregistré" });
      } else {
        res.json({ result: true, user });
      }
    }   
  }
})

/*
  Sign-in
  Body: email (string), password (string)
  Response: result(bool),erro(string), user(object)
*/

router.post('/sign-in', async (req, res, next) => {
  let password = req.body.password
  let email = req.body.email

  if (!password || !email) {
    res.json({ result: false, error: "Veuillez remplir tous les champs" });
  } else {
    user = await userModel.findOne({
      email: email,
    });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      res.json({ result: false, error: "Email ou mot de pass incorrect" });
    } else {
      res.json({ result: true, user });
    }
  }

})

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


router.post('/account', async (req, res, next) => {

  let firstName = req.body.firstName
  let lastName = req.body.lastName
  let avatarUrl = req.body.avatarUrl
  let email = req.body.email
  let type = req.body.type
  let oldPassword = req.body.oldPassword
  let newPassword = req.body.newPassword
  let confirmPassword = req.body.confirmPassword
  let token = req.body.token

  if(!firstName || !lastName || !email || !type ) {
    res.json({ result: false, error: 'Les champs prénom, nom , email et profil utilisateurs sont obligatoires'})
  } else {
    let user = await userModel.findOne({ token: req.body.token })
    if (oldPassword) {
      let checkPassword = bcrypt.compareSync(oldPassword, user.password)      
      if(checkPassword) {
        if ( !newPassword || !confirmPassword ) {
          res.json({ result: false, error: 'Pour changer votre mot de passe, les champs nouveau mot de passe et confirmation du mot de passe sont obligatoires' });
        } else {
          if (newPassword !== confirmPassword) {
            res.json({ result: false, error: 'Le nouveau mot de passe et la confirmation du mot de passe ne correspondent pas, veuillez les ressaisir' });
          } else {
            var newPasswordHash = bcrypt.hashSync(newPassword, 10);
            var updatedUser = await userModel.updateOne(
              { token: token },
              {
                avatarUrl: avatarUrl,
                email: email,
                firstName: firstName,
                lastName: lastName,
                groupsId: type,
                password: newPasswordHash
              });

              if (updatedUser) {
                let user = await userModel.findOne({ token: token });
                res.json({ result: true, user });
              } else {
                res.json({ result: false, error: 'Erreur de chargement' });
              }
          }
        }
      } else {
        res.json({ result: false, error: 'Mauvais mot de passe' });
      }
    } else {
      var updatedUser = await userModel.updateOne(
        { token: token },
        {
          avatarUrl: avatarUrl,
          email: email,
          firstName: firstName,
          lastName: lastName,
          groupsId: type
        });
        if (updatedUser) {
          let user = await userModel.findOne({ token: token });
          res.json({ result: true, user });
        } else {
          res.json({ result: false, error: 'Erreur de chargement' });
        }
    }    
  }
})



// router.post("/account", async (req, res, next) => {
//   let result = false;
//   let error = [];
//   let user = await userModel.findOne({ token: req.body.token });

//   if (user) {
//     token = user.token
//   }

//   /* renommage de tout du frontend */
//   let avatarUrl = req.body.avatarUrl;
//   let firstName = req.body.firstName;
//   let lastName = req.body.lastName;
//   let email = req.body.email;
//   let type = req.body.type;
//   let oldPassword = req.body.oldPassword;
//   let confirmPassword = req.body.confirmPassword;
//   let newPassword = req.body.newPassword

//   // On vérifie la saisie dans les champs indispensables email firstname lastname
//   if (!email || email == 'undefined') {
//     error.push(`Champ "Email" vide`);
//   }
//   if (!firstName || firstName == 'undefined') {
//     error.push(`Champ "Prénom" vide`);
//   }
//   if (!lastName || lastName == 'undefined') {
//     error.push(`Champ "Nom" vide`);
//   }


//   /* Si l'utilisateur a entré un ancien mot de passe: */
//   if (oldPassword) {
//     var oldPasswordhash = bcrypt.hashSync(oldPassword, 10);
//     let checkPassword = bcrypt.compareSync(oldPasswordhash, user.password)

//     if (checkPassword == false) {
//       error.push(`"Ancien mot de passe" erroné`);
//     }

//     /* Vérification la presence de contenu sur les nouveau mot de passe */
//     else if (!newPassword) {
//       error.push(`Champ "Nouveau mot de passe" vide`);
//     }
//     else if (!confirmPassword) {
//       error.push(`Champ "Ancien mot de passe" vide`);
//     }
//     /* Vérification du contenu des nouveaux mot de passe*/

//     else if (newPassword !== confirmPassword) {
//       error.push("Les ancien et nouveau mot de passe sont différents ");
//     }
//   }



//   if (error.length == 0) {
//     result = true;
//     /* enregistrement de toutes les nouvelles infos en base de donnée */
//     var updatedUser = await userModel.updateOne(
//       { token: token },
//       {
//         avatarUrl: avatarUrl,
//         email: email,
//         firstName: firstName,
//         lastName: lastName,
//         groupsId: type,
//       });

//     if (updatedUser != null) {
//       let newUserdata = await userModel.findOne({ token: token });
//       res.json({ result, error, user: newUserdata });
//     }
//   } else {
//     res.json({ result, error })
//   }
// });

module.exports = router;
