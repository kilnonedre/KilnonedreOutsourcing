const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  num: {
    type: String,
    default: 0,
  },
  pro1: {
    type: String,
    default: 0,
  },
})

const User = mongoose.model('User', userSchema)

module.exports = {
  User,
}
