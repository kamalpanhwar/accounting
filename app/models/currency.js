var mongoose = require('mongoose')
var Schema = mongoose.Schema
var moment = require('moment')

var CurrencySchema = new Schema(
  {
    name: {type: String, required: true, unique: true},
  },
  {timestamps: true}
)

module.exports = mongoose.model('Currency', CurrencySchema)
