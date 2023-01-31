const mongoose = require('mongoose')

const workIntroductionSchema = new mongoose.Schema({
  title: {
    type: String,
    default: 0,
  },
  content: {
    type: String,
    default: 0,
  },
  need: {
    type: String,
    default: 0,
  },
})

const WorkIntroduction = mongoose.model(
  'WorkIntroduction',
  workIntroductionSchema
)

module.exports = {
  WorkIntroduction,
}
