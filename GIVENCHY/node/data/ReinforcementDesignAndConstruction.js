const mongoose = require('mongoose')

const reinforcementDesignAndConstructionSchema = new mongoose.Schema({
  num: {
    type: Number,
    default: 0,
  },
  pro1: {
    type: String,
    default: 0,
  },
})

const ReinforcementDesignAndConstruction = mongoose.model(
  'ReinforcementDesignAndConstruction',
  reinforcementDesignAndConstructionSchema
)

module.exports = {
  ReinforcementDesignAndConstruction,
}
