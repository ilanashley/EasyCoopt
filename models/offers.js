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
    status: Boolean,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
    });
    
    const offerModel = mongoose.model('offers', offerSchema);

    module.exports = offerModel