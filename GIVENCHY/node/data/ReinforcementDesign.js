const mongoose = require('mongoose')

const reinforcementDesignSchema = new mongoose.Schema({
  num: {
    type: Number,
    default: 0,
  },
  pro1: {
    type: String,
    default: 0,
  },
})

const ReinforcementDesign = mongoose.model(
  'ReinforcementDesign',
  reinforcementDesignSchema
)

module.exports = {
  ReinforcementDesign,
}
