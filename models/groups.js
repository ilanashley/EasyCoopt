const mongoose = require('mongoose')

const groupsSchema = mongoose.Schema({
    type : String,
})

const groupsModel = mongoose.model('groups', groupsSchema)

module.exports = groupsModel