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
  
  /* send cv in cloudinary */
  var cvPath = './tmp/' + uniqid() + '.jpg';
  var resultCopy = await req.files.cv.mv(cvPath);
  if(resultCopy) {
    console.log('resultCopy exist')
  }
  if (!resultCopy) {
    var resultCloudinary = await cloudinary.uploader.upload(cvPath);
    
  // console.log('resultCloudinary --> ', resultCloudinary)

    const newReferral = new referralModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      reason: req.body.reason,
      email: req.body.email,
      resumeUrl: resultCloudinary.url,
      creationDate: req.body.creationDate,
      status: '1',
      userId: req.body.userId,
      offerId: req.body.offerId
    });
    var savedReferral = await newReferral.save()
    console.log(savedRefferal ? 'SavedReferral exist' : "SavedReferral doesn't exist")
    // var updatedOffer = await offersModel.updateOne(
    //   { id: req.body.offerId },
    //   {
    //     $push: { referralsIds: savedReferral._id }
    //   }
    // );

    // console.log(updatedOffer ? 'updatedOffer exist' : "updatedOffer doesn't exist")


    if(savedReferral && updatedOffer) {
      res.json({ result: true, success: "La cooptation a bien été enregistrée" });
    } else {
      res.json({ result: false, error: "La connexion à la bdd a échoué" });
    }
  
  }
  fs.unlinkSync(cvPath);
});

/* Get Referrals*/
router.get('/get', async (req, res, next) => {
  var referrals = await referralModel.find().populate('offerId').populate('userId').exec();
  if (!referrals) {
    res.json({ result: false, error: "Il manque des données" });
  } else {
    res.json({ result: true, referrals });
  }
});

router.post('/update', async (req, res, next) => {
  await referralModel.updateOne({ _id: req.body.referralId }, { status: req.body.referralStatus });
  res.json({ result: true })
})

router.delete('/delete/:referralId', async (req, res, next) => {
  await referralModel.deleteOne({ _id: req.params.referralId })
  res.json({ result: true })
})


module.exports = router;
