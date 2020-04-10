var Account = require('../models/account')
var AccountType = require('../models/account_type')
const {body, validationResult} = require('express-validator/check')
const {sanitizeBody} = require('express-validator/filter')

exports.new = function(req, res, next) {
  if (!req.isAuthenticated()) {
    req.flash('error', 'Please login to create account')
    res.redirect('/system/login')
  } else {
    AccountType.find({}, 'name')
      .populate('account_type')
      .sort([['name', 'ascending']])
      .exec(function(err, accounttypes) {
        if (err) {
          return next(err)
        }
        res.render('accounts/new', {
          title: 'Create Account',
          accounttypes: accounttypes,
        })
      })
  }
}
