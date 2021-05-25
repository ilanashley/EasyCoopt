const mongoose = require('mongoose')

const referralSchema = mongoose.Schema({
    creationDate : Date,
    firstName: String,
    lastName: String,
    reason: String,
    resumeUrl: String,
    email: String,
    status: String,
    isAgree: Boolean,
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    offerId: {type: mongoose.Schema.Types.ObjectId, ref: 'offers'}
})

const referralModel = mongoose.model('referrals', referralSchema)

module.exports = referralModel