var express = require('express');
var router = express.Router();

//{ addDate: '12/03/2021', recipientName: 'alex', reward: 500, referralName: 'Dupont', recommandation: 'il est super génial', offer: 'Web Developper Senior', resumeUrl: 'CvUrl', status: "1" },


/* Get Referrals*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
