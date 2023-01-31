const mongoose = require('mongoose')

const reinforcementConstructionSchema = new mongoose.Schema({
  num: {
    type: Number,
    default: 0,
  },
  pro1: {
    type: String,
    default: 0,
  },
})

const ReinforcementConstruction = mongoose.model(
  'ReinforcementConstruction',
  reinforcementConstructionSchema
)

module.exports = {
  ReinforcementConstruction,
}
