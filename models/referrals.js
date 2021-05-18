const mongoose = require('mongoose')

//{ addDate: '12/03/2021', recipientName: 'alex', reward: 500, referralName: 'Dupont', recommandation: 'il est super génial', offer: 'Web Developper Senior', resumeUrl: 'CvUrl', status: "1" },


const referralSchema = mongoose.Schema({
    addDate : Date,
    recipientName : String,
    reward : Number,
    referralName: String,
    recommandation: String,
    offerTitle: String,
    resumeUrl: String,
    status: String
})

const userModel = mongoose.model('referrals', referralSchema)

module.exports = referralModel