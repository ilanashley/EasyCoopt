var express = require('express');
var router = express.Router();

var offerModel = require("../models/offers");
var userModel = require("../models/users");


router.get('/get', async (req, res, next) => {
  var offers = await offerModel.find()
  if (!offers) {
    res.json({ result: false, error: "Il n'y a pas d'offre à afficher" })
  } else {
    res.json({ result: true, offers })
  }
})

router.post('/add', async function (req, res, next) {

  let title = req.body.title;
  let city = req.body.city;
  let creationDate = req.body.creationDate;
  let bonusAmount = req.body.bonusAmount;
  let contract = req.body.contract;
  let link = req.body.link;
  let resume = req.body.resume;
  let status = req.body.status;
  var error = [];
  let result = false;
  let saveOffer = null;

  var user = await userModel.findOne({ token: req.body.token })

  // Si un des champs est vide, afficher un message d'erreur
  if (!title || !city || !creationDate || !bonusAmount || !contract || !link || !resume) {
    error.push("Champs vides");
    res.json({ result, error });
  }

  if ((user != null && error.length == 0)) {
    var newOffer = new offerModel({
      title: title,
      city: city,
      creationDate: creationDate,
      bonusAmount: bonusAmount,
      contract: contract,
      link: link,
      resume: resume,
      status: true,
    });

    saveOffer = await newOffer.save();

    var n = await userModel.updateOne(
      { token: req.body.token },
      {
        $push: { offersId: saveOffer._id }
      }
    );

    if (saveOffer) {
      result = true;
    }

    res.json({ result, offer: saveOffer, error, token });
  }
})

router.put('/add', async function (req, res, next) {

  let title = req.body.title;
  let city = req.body.city;
  let creationDate = req.body.creationDate;
  let bonusAmount = req.body.bonusAmount;
  let contract = req.body.contract;
  let link = req.body.link;
  let resume = req.body.resume;
  let status = req.body.status;
  var error = [];
  let result = false;
  let saveOffer = null;

  var user = await userModel.findOne({ token: req.body.token })

  // Si un des champs est vide, afficher un message d'erreur
  if (!title || !city || !creationDate || !bonusAmount || !contract || !link || !resume) {
    error.push("Champs vides");
    res.json({ result, error });
  }

  if ((user != null && error.length == 0)) {
    var modifiedOffer = await offerModel.updateOne(
      { _id: req.body.id },
      {
        title: title,
        city: city,
        creationDate: creationDate,
        bonusAmount: bonusAmount,
        contract: contract,
        link: link,
        resume: resume,
        status: true,
      });

    if (modifiedOffer) {
      result = true;
    }

    res.json({ result, offer: modifiedOffer, error, token });
  }
})

router.put('/archive', async function (req, res, next) {
  var result = false
  var status = req.body.status

  var archiveOffer = await offerModel.updateOne(
    { _id: req.body.id },
    {
      status: status
    }
  );

  var offerCurrent = await offerModel.findOne({ _id: req.body.id })
  if (offerCurrent.status === false) { result = true }

  res.json({ result, offerCurrent })
})

router.get("/offer", async function (req, res, next) {
  var user = await offerModel.findOne({ id: req.query.token });

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


/* Get Offer By Id */
router.get('/findById/:offerId', async (req, res, next )=> {
  // console.log('id du back ---> ', req.params.offerId)
  var offer = await offerModel.findById({ _id: req.params.offerId}) 
  if(offer) {
    res.json({result: true, offerTitle: offer.title})
  }
  res.json({result: false})
})


module.exports = router;