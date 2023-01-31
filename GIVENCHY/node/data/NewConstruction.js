const mongoose = require('mongoose')

const newConstructionSchema = new mongoose.Schema({
  num: {
    type: Number,
    default: 0,
  },
  pro1: {
    type: String,
    default: 0,
  },
})

const NewConstruction = mongoose.model('NewConstruction', newConstructionSchema)

module.exports = {
  NewConstruction,
}
