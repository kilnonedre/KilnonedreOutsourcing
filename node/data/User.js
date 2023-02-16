const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  userAccount: {
    type: String,
    default: ''
  },
  userEmail: {
    type: String,
    default: ''
  },
  userPassword: {
    type: String,
    default: ''
  }
})

const User = mongoose.model('User', userSchema)

module.exports = {
  User
}
