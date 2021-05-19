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
  const newReferral = new referralModel({
    firstName : req.body.firstName,
    lastName: req.body.lastName,
    reason: req.body.reason,
    email: req.body.email,
    resumeUrl: req.body.resumeUrl,
    creationDate : req.body.creationDate,
    status: '1'
  });
  var referral = await newReferral.save();
  await offerModel.updateOne(
    {_id: req.body.offerId},
    {
      $push: { referraslId: referral._id }
    }
  );
  res.json({result: true})
})



/* Get Referrals*/
router.get('/get', async (req, res, next) => {
  let error
  let usersInfo = []
  var users = await userModel.find().populate({ path: 'offersId', populate: { path: 'referralsId' }}).exec();
  if(!users) {
    error = "Il manque des données"
    res.json({result: false, error, usersInfo});
  }  else {
   
    for(let k=0; k<users.length; k++) {
      for(let i=0; i<users[k].offersId.length; i++) {
        for(let j=0; j<users[k].offersId[i].referralsId.length; j++) {
          usersInfo.push({
            recipientFirstName: users[k].firstName,
            recipientLastName: users[k].lastName,
            offerTitle: users[k].offersId[i].title,
            offerContent: users[k].offersId[i].content,
            offerBonusAmount: users[k].offersId[i].bonusAmount,
            referralCreationDate: users[k].offersId[i].referralsId[j].creationDate,
            referralFirstName: users[k].offersId[i].referralsId[j].firstName,
            referralLastName: users[k].offersId[i].referralsId[j].lastName,
            referralReason: users[k].offersId[i].referralsId[j].reason,
            referralStatus: users[k].offersId[i].referralsId[j].status
          })
        }
      }
    }
    res.json({result: true, usersInfo});
  }
  
});


module.exports = router;
