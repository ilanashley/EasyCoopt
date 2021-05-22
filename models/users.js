const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstName : String,
    lastName : String,
    email : String,
    password: String,
    token: String,
    avatarUrl: String,
    group: String,
    offersIds: [{type: mongoose.Schema.Types.ObjectId, ref: 'offers'}]
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel