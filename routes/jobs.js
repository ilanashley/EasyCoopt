var express = require('express');
var router = express.Router();

var offerModel = require("../models/offers");

router.post('/add', async function (req, res, next) {
  // let token = req.body.token;
  let title = req.body.title;
  let city = req.body.city;
  let date = req.body.date;
  let bonus = req.body.bonus;
  let link = req.body.link;
  let resume = req.body.resume;
  var error = [];
  let result = false;
  let saveOffer = null;
  let user = null;

  // if (title.length < 3){
  //     res.json({ result: false });
  //   } 
  // else if (location.length < 3){
  //     res.json({ result: false });
  //   }

  // Si un des champs est vide, afficher un message d'erreur

  if ( !title || !city || !date || !bonus || !link || !resume ) {
    error.push("Champs vides");
    res.json({ result, error });
  }

  if ((error.length == 0)) {
    // user = await userModel.findOne({
    //   email: email,
    // });
    var newOffer = new offerModel({
      title: title,
      city: city,
      date: date,
      bonus: bonus,
      link: link,
      resume: resume
    });

    saveOffer = await newOffer.save();

    if (saveOffer) {
      result = true;
     // token = user.token;
    }

    res.json({ result, offer: saveOffer, error, token });

    // res.json({ result, offer: saveOffer, error, token });
  }
})

module.exports = router;