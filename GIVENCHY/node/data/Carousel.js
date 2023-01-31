const mongoose = require('mongoose')

const carouselSchema = new mongoose.Schema({
  content: {
    type: String,
    default: 0,
  },
})

const Carousel = mongoose.model('Carousel', carouselSchema)

module.exports = {
  Carousel,
}
