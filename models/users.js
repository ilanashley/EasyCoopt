const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstName : String,
    lastName : String,
    email : String,
    password: String,
    token: String,
    avatarUrl: String,
    // groupsId: [{type: mongoose.Schema.Types.ObjectId, ref: 'groups'}],
    // offersId: [{type: mongoose.Schema.Types.ObjectId, ref: 'offers'}]
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel