var express = require('express');
var router = express.Router();

var userModel = require("../models/users");
var offerModel = require("../models/offers");
var referralModel = require('../models/referrals');

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


/* Add Referrals */

router.post('/add', async (req, res, next) => {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let reason = req.body.reason;
  let email = req.body.email;
  let creationDate = req.body.creationDate;
  let cv = req.files.cv
  let isAgree = req.body.isAgree

  console.log('isAgree --> ', isAgree)
  
  // Condition champs vides
  if(!firstName || !lastName || !reason || !email || !creationDate || !cv ){
    res.json({result: false, error: 'Les champs ne sont pas tous renseignés'})

    // Condition fichier trop gros
  } else if(cv.size > 10000000) {
    res.json({result: false, error: 'Le fichier est trop volumineux'})
  } else {
    
     // envoi du cv vers cloudinary
  var cvPath = './tmp/' + uniqid() + '.jpg';
  var resultCopy = await req.files.cv.mv(cvPath);
  if(resultCopy) {
    console.log(resultCopy)
  }
  if (!resultCopy) {
    var resultCloudinary = await cloudinary.uploader.upload(cvPath);
     if(!resultCloudinary){
      res.json({ result: false, error: 'failed' });
     } 

     // Création du coopte
     else {
      const newReferral = new referralModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        reason: req.body.reason,
        email: req.body.email,
        resumeUrl: resultCloudinary.url,
        creationDate: req.body.creationDate,
        status: '1',
        userId: req.body.userId,
        offerId: req.body.offerId,
        isAgree: req.body.isAgree
      });
  
  
      var savedReferral = await newReferral.save()
      var updatedOffer = await offerModel.updateOne(
        { _id: req.body.offerId },
        {
          $push: { referralsIds: savedReferral._id }
        }
      );
      if(savedReferral && updatedOffer)  {
        res.json({ result: true, success: 'Votre cooptation a bien été prise en compte' });
      } else {
        res.json({ result: false, error: 'failed' });
      }
     }
  }
  fs.unlinkSync(cvPath);
  }
  
 
});

/* Get Referrals*/
router.get('/get', async (req, res, next) => {
  var referrals = await referralModel.find().populate({ path: 'offerId', populate: { path: 'userId'}}).populate('userId').exec();
  if (!referrals) {
    res.json({ result: false, error: "Il manque des données" });
  } else {
    res.json({ result: true, referrals });
  }
});

router.post('/update', async (req, res, next) => {
  var updatedReferral = await referralModel.updateOne({ _id: req.body.referralId }, { status: req.body.referralStatus });
  if(updatedReferral) {
    res.json({ result: true })
  } else {
    res.json({ result: false })
  }
})

router.delete('/delete/:referralId/:offerId', async (req, res, next) => {
  var deletedReferral = await referralModel.deleteOne({ _id: req.params.referralId })
  var updatedOffer = await offerModel.updateOne(
    { _id: req.params.offerId },
    {
      $pull: { referralsIds: req.params.referralId }
    }
  );
  if(deletedReferral && updatedOffer) {
    res.json({ result: true })
  } else {
    res.json({ result: false })
  }

})


module.exports = router;
