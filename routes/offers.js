var express = require('express');
var router = express.Router();

var offerModel = require("../models/offers");
var userModel = require("../models/users");


router.get('/get', async (req, res, next) => {
  var offers = await offerModel.find().populate('userId').populate('referralsIds').exec();
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
  let isActive = true; 

  var user = await userModel.findOne({ token: req.body.token })

  // Si un des champs est vide, afficher un message d'erreur
  if (!title || !city || !creationDate || !bonusAmount || !contract || !resume) {
    res.json({ result: false, error: "Tous les champs sont requis sauf le lien" });
  } else {
    if (user) {
      var newOffer = new offerModel({
        title: title,
        city: city,
        creationDate: creationDate,
        bonusAmount: bonusAmount,
        contract: contract,
        link: link,
        resume: resume,
        isActive: isActive,
        userId: user._id
      });
      var savedOffer = await newOffer.save();
      var updatedUser = await userModel.updateOne(
        { token: req.body.token },
        {
          $push: { offersId: savedOffer._id }
        }
      );
  
      if (savedOffer && updatedUser) {
        res.json({ result: true, success: "L'offre a bien été enregistrée" });
      } else {
        res.json({ result: false, error: "La connexion à la bdd a échoué" });
      }
    } else {
      res.json({ result: false, error: "Cet utilisateur n'existe pas" });
    }
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
  let isActive = req.body.isActive;

  var user = await userModel.findOne({ token: req.body.token })

  // Si un des champs est vide, afficher un message d'erreur
  if (!title || !city || !creationDate || !bonusAmount || !contract || !resume) {
    res.json({ result: false, error: 'Tous les champs sont requis sauf le lien' });
  } else {
    if (user) {
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
          isActive: isActive,
          userId: user._id
        });
  
      if (modifiedOffer) {
        res.json({ result: true, success: "La modification a bien été prise en compte" });
      } else{
        res.json({ result: false, error: "La connexion à la bdd a échoué" });
      }  
    } else {
      res.json({ result: false, error: "Cet utilisateur n'existe pas" });
    }
  } 
})

router.put('/archive', async function (req, res, next) {
  var isActive = req.body.isActive
  var offerId = req.body.offerId
  var updatedOffer = await offerModel.updateOne(
    { _id: offerId },
    {
      isActive: isActive
    }
  );

  if (updatedOffer) {
    res.json({ result: true, success: "L'offre a bien été archivée" })
  } else {
    res.json({ result: false, error: "L'offre n'a pas été archivée, veuillez recommencer" })
  }

  
})

router.get("/offer", async function (req, res, next) {
  var user = await offerModel.findOne({ id: req.query.token });

  if (user != null) {
    password = user.password,
    avatarUrl = user.avatarUrl,
    email = user.email,
    firstName = user.firstName,
    lastName = user.lastName,
    type = user.groupsId
  }
  res.json({ password, avatarUrl, email, firstName, lastName, type });
});


/* Get Offer By Id */
router.get('/findById/:offerId', async (req, res, next )=> {
  // console.log('id du back ---> ', req.params.offerId)
  var offer = await offerModel.findById({ _id: req.params.offerId}) 
  if(!offer) {
    res.json({result: false, error: "L'offre n'existe pas" })
  } else {
    res.json({result: true, offer})  
  }
})


module.exports = router;