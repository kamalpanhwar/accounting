var mongoose = require('mongoose')
var validator = require('validator')
var Schema = mongoose.Schema

var UserSchema = new Schema(
  {
    name: {type: String, required: true},
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: (value) => {
        return validator.isEmail(value)
      },
    },
    username: {type: String, required: true, unique: true},
    mobile_number: {type: String},
    business_name: {type: String},
    business_owner: {type: String},
    currency_id: {type: Schema.Types.ObjectId, ref: 'Currency', required: true},
    subscription_id: {type: Number},
    reset_password_token: {type: String, required: false},
    encrypted_password: {type: String, required: true},
    reset_password_sent_at: {type: String},
    remember_created_at: {type: Date},
    sign_in_count: {type: Number},
    current_sign_in_at: {type: Date},
    last_sign_in_at: {type: Date},
    last_sign_in_ip: {type: Date},
    pincode: {type: String},
    confirmation_token: {type: String},
    confirmed_at: {type: Date},
    confirmation_sent_at: {type: Date},
    unconfirmed_email: {type: Boolean},
    approved: {type: Boolean, default: false},
    user_locale: {type: String},
  },
  {timestamps: true}
)

UserSchema.virtual('url').get(function() {
  return '/user/' + this._id
})

module.exports = mongoose.model('User', UserSchema)
