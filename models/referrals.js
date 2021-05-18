const mongoose = require('mongoose')

const referralSchema = mongoose.Schema({
    creationDate : Date,
    firstName: String,
    lastName: String,
    reason: String,
    resumeUrl: String,
    email: String,
    status: String
})

const referralModel = mongoose.model('referrals', referralSchema)

module.exports = referralModel