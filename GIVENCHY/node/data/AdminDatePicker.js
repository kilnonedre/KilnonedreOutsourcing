const mongoose = require('mongoose')

const adminDatePickerSchema = new mongoose.Schema({
  data: {
    type: String,
    default: 0,
  },
  introduce: {
    type: String,
    default: 0,
  },
})

const AdminDatePicker = mongoose.model('AdminDatePicker', adminDatePickerSchema)

module.exports = {
  AdminDatePicker,
}
