const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    Image: String,
    Name: String,
    Email: String
})

module.exports = mongoose.model('user', userSchema)