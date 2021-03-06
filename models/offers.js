const mongoose = require('mongoose')

const offerSchema = mongoose.Schema({
    title : String,
    content: String,
    creationDate : Date,
    bonusAmount: Number,
    link: String,
    contract: String,
    city: String,
    resume: String,
    isActive: Boolean,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    referralsIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'referrals' }]
    });
    
    const offerModel = mongoose.model('offers', offerSchema);

    module.exports = offerModel