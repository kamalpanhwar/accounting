const mongoose = require('mongoose')
var Schema = mongoose.Schema
const moment = require('moment')

var AccountTypeSchema = new Schema(
  {
    name: {type: String, required: true, unique: true},
    type: {type: String, required: true},
    number: {type: Number, required: true, uniqe: true},
  },
  {timestamps: true}
)

module.exports = mongoose.model('AccountType', AccountTypeSchema)
