var mongoose = require('mongoose')
var Schema = mongoose.Schema
var moment = require('moment')

var CurrencySchema = new Schema(
  {
    abbr: {type: String, required: true, unique: true},
    name: {type: String},
    symbol: {type: String},
  },
  {timestamps: true}
)

module.exports = mongoose.model('Currency', CurrencySchema)
