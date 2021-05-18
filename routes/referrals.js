var express = require('express');
var router = express.Router();

var userModel = require("../models/users");
var offerModel = require("../models/offers");
var referralModel = require('../models/referrals');

/* Add Referrals */
router.post('/add-referral', async (req, res, next) => {
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
router.get('/get-referrals', async (req, res, next) => {

  var users = await userModel.find().populate({ path: 'offersId', populate: { path: 'referralsId' }}).exec();
  let usersInfo = []
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
});


module.exports = router;
