var mongoose = require('mongoose')
var validator = require('validator')
var Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const crypto = require('crypto')

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
    mobile: {type: String},
    organization: {type: String},
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

UserSchema.pre('save', function(next) {
  const user = this
  if (!user.isModified('encrypted_password')) return next()
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err)
    bcrypt.hash(user.encrypted_password, salt, function(err, hash) {
      if (err) return next(err)
      ;(token = crypto.randomBytes(20).toString('hex')),
        (user.encrypted_password = hash)
      user.confirmation_token = token
      next()
    })
  })
})

UserSchema.virtual('url').get(function() {
  return '/user/' + this._id
})

UserSchema.methods.comparePassword = function(password) {
  console.log(` it got Password: ${password} `)
  return bcrypt.compareSync(password, this.encrypted_password)
}

UserSchema.methods.generatePasswordReset = function() {
  this.reset_password_token = crypto.randomBytes(20).toString('hex')
  this.reset_password_sent_at = Date.now() + 36000000
}

module.exports = mongoose.model('User', UserSchema)
