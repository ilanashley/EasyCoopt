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
  
  // Condition champs vides
  if(!firstName || !lastName || !reason || !email || !creationDate || !cv){
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
    console.log('resultCloudinary --> ', resultCloudinary)
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
        offerId: req.body.offerId
      });
  
  
      var savedReferral = await newReferral.save()
  
      if(savedReferral) {
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
  var referrals = await referralModel.find().populate('offerId').populate('userId').exec();
  if (!referrals) {
    res.json({ result: false, error: "Il manque des données" });
  } else {
    res.json({ result: true, referrals });
  }
});


// /* Get Referrals*/
// router.get('/get', async (req, res, next) => {
//   let error
//   let usersInfo = []
//   var users = await userModel.find().populate({ path: 'offersId', populate: { path: 'referralsId' } }).exec();
//   if (!users) {
//     error = "Il manque des données"
//     res.json({ result: false, error, usersInfo });
//   } else {

    // console.log('tous les utilisateurs --> ', users[0].offersId)

    // users = users.filter(user => user.groupsId === 'Coopteur')
    // console.log('Uniquement les coopteurs --> ', users)
    // const referralsPerRecipient = referrals.filter(referral => referral.recipientLastName === event.target.value)

    // for (let k = 0; k < users.length; k++) {
    //   for (let i = 0; i < users[k].offersId.length; i++) {
    //     for (let j = 0; j < users[k].offersId[i].referralsId.length; j++) {
    //       usersInfo.push({
    //         recipientToken: users[k].token,
    //         recipientFirstName: users[k].firstName,
    //         recipientLastName: users[k].lastName,
    //         offerId: users[k].offersId[i]._id,
    //         offerTitle: users[k].offersId[i].title,
    //         offerContent: users[k].offersId[i].content,
    //         offerBonusAmount: users[k].offersId[i].bonusAmount,
    //         referralId: users[k].offersId[i].referralsId[j]._id,
    //         referralCreationDate: users[k].offersId[i].referralsId[j].creationDate,
    //         referralFirstName: users[k].offersId[i].referralsId[j].firstName,
    //         referralLastName: users[k].offersId[i].referralsId[j].lastName,
    //         referralReason: users[k].offersId[i].referralsId[j].reason,
    //         referralStatus: users[k].offersId[i].referralsId[j].status,
    //         referralResumeUrl: users[k].offersId[i].referralsId[j].resumeUrl
    //       })
    //     }
    //   }
    // }


    // console.log('usersInfo --> ', usersInfo)

//     res.json({ result: true, usersInfo });
//   }
// });

router.post('/update', async (req, res, next) => {
  await referralModel.updateOne({ _id: req.body.referralId }, { status: req.body.referralStatus });
  res.json({ result: true })
})

router.delete('/delete/:referralId', async (req, res, next) => {
  // console.log(req.params.referralId)
  await referralModel.deleteOne({ _id: req.params.referralId })
  res.json({ result: true })
})


module.exports = router;
