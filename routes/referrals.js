var express = require('express');
var router = express.Router();

var userModel = require("../models/users");
var offerModel = require("../models/offers");
var referralModel = require('../models/referrals');

/* Add Referrals */
router.post('/add', async (req, res, next) => {
  const newReferral = new referralModel({
    creationDate : req.body.creationDate,
    firstName : req.body.firstName,
    lastName: req.body.lastName,
    reason: req.body.reason,
    email: req.body.email,
    resumeUrl: req.body.resumeUrl,
    status: req.body.status
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
            offerId: users[k].offersId[i]._id,
            offerTitle: users[k].offersId[i].title,
            offerContent: users[k].offersId[i].content,
            offerBonusAmount: users[k].offersId[i].bonusAmount,
            referralId: users[k].offersId[i].referralsId[j]._id,
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

router.post('/update', async (req, res, next) => {
  await referralModel.updateOne({_id: req.body.referralId}, { status: req.body.referralStatus });
  res.json({result: true})
})

router.delete('/delete/:referralId', async (req, res, next) => {
  // console.log(req.params.referralId)
  await referralModel.deleteOne({_id: req.params.referralId})
  res.json({result: true})
})


module.exports = router;
