var express = require('express');
var router = express.Router();

router.post('/add', async function(req, res, next){
    let token = req.body.token;
    let title = req.body.title;
    let content = req.body.content;
    let offerDate = req.body.offerDate;
    let bonusAmount = req.body.bonusAmount;
    let link = req.body.link;
    let statusOffer = 'active';
    let location = req.body.location;

    if (title.length < 3){
        res.json({ result: false });
      } 
    else if (location.length < 3){
        res.json({ result: false });
      } 
    
    else if (!token || !title || !content || !offerDate || !bonusAmount || !location   ) {
        res.json({ result: false });
      } 
      
      else {
        // Traitement de l'ajout d'annonce
        res.json({ result: true });
      }
  })

  module.exports = router;