var mongoose = require('mongoose')
var Schema = mongoose.Schema
var AccountType = require('./account_type')

var AccountSchema = new Schema(
  {
    number: {type: Number, required: true, unique: true},
    title: {type: String, required: true},
    type_id: {type: Schema.Types.ObjectId, ref: 'AccountType', required: true},
    address: {type: String},
    active: {type: Boolean},
  },
  {timestamps: true}
)

AccountSchema.pre('save', function(next) {
  const account = this
})

module.exports = mongoose.model('Account', AccountSchema)
