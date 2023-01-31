const mongoose = require('mongoose')

const fieldExampleSchema = new mongoose.Schema({
  content: {
    type: String,
    default: 0,
  },
  url: {
    type: String,
    default: 0,
  },
})

const FieldExample = mongoose.model('FieldExample', fieldExampleSchema)

module.exports = {
  FieldExample,
}
