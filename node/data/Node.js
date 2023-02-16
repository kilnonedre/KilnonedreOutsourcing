const mongoose = require('mongoose')

const nodeSchema = new mongoose.Schema({
  username: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    default: ''
  },
  schedule: {
    type: Number,
    default: 0
  },
  star: {
    type: Number,
    default: 0
  },
  esrimatedFinishTime: {
    type: String,
    default: ''
  },
  bulidTime: {
    type: String,
    default: ''
  },
  finishedTime: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  isDone: {
    type: Number,
    default: 0
  }
})

const Node = mongoose.model('Node', nodeSchema)

module.exports = {
  Node
}
