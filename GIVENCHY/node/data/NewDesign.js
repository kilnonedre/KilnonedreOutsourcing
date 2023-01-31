const mongoose = require('mongoose')

const newDesignSchema = new mongoose.Schema({
  num: {
    type: Number,
    default: 0,
  },
  pro1: {
    type: String,
    default: 0,
  },
})

const NewDesign = mongoose.model('NewDesign', newDesignSchema)

module.exports = {
  NewDesign,
}
