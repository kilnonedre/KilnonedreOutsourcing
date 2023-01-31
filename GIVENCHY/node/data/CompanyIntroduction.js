const mongoose = require('mongoose')

const companyIntroductionSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 0,
  },
  content: {
    type: String,
    default: 0,
  },
})

const CompanyIntroduction = mongoose.model(
  'CompanyIntroduction',
  companyIntroductionSchema
)

module.exports = {
  CompanyIntroduction,
}
