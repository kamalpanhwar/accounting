var User = require('../models/user')
var Currency = require('../models/currency')
const {body, validationResult} = require('express-validator/check')
const {sanitizeBody} = require('express-validator/filter')

exports.new = function(req, res, next) {
  Currency.find({}, 'name')
    .populate('currency')
    .sort([['name', 'ascending']])
    .exec(function(err, currencies) {
      if (err) {
        return next(err)
      }
      res.render('users/new', {
        title: 'Signup',
        currencies: currencies,
      })
    })
}

exports.create = [
  body('name')
    .isLength({min: 5})
    .withMessage('Name must be more 5 letters')
    .trim()
    .withMessage('Name is required field'),
  body('email', 'Email must be specified')
    .isLength({min: 1})
    .trim()
    .withMessage('Email must be specified'),
  body('encrypted_password')
    .isLength({min: 5})
    .trim()
    .withMessage('Password must be specified')
    .custom((value, {req, loc, path}) => {
      if (value !== req.body.confirm_password) {
        throw new Error("Password don't match")
      } else {
        return value
      }
    }),
  body('username')
    .isLength({min: 5})
    .trim()
    .withMessage('Username must be specified'),
  body('currency')
    .isLength({min: 1})
    .trim()
    .withMessage('Currency is required'),
  // Sanitize fields
  sanitizeBody('name').escape(),
  sanitizeBody('encrypted_email').escape(),
  sanitizeBody('password').escape(),
  sanitizeBody('username').escape(),
  sanitizeBody('currency').escape(),
  (req, res, next) => {
    const errors = validationResult(req)
    consoleLog(errors)
    consoleLog(req.body.name)
    consoleLog(req.body.email)
    consoleLog(req.body.organization)
    consoleLog(req.body.currency)
    consoleLog(req.body.username)
    var user = new User({
      name: req.body.name,
      email: req.body.email,
      encrypted_password: req.body.encrypted_password,
      username: req.body.username,
      currency_id: req.body.currency,
      organization: req.body.organization,
    })
    if (!errors.isEmpty()) {
      Currency.find({}, 'name').exec(function(err, currencies) {
        if (err) {
          next(err)
        }
        res.render('users/new', {
          title: 'Signup',
          user: user,
          currencies: currencies,
          errors: errors.array(),
        })
      })
      return
    } else {
      user.save(function(err) {
        if (err) {
          return next(err)
        }
        res.redirect('/system/confirm')
      })
    }
  },
]

exports.createstop = [
  body('name', 'Name must be specified')
    .trim()
    .isLength({min: 5}),
  sanitizeBody('name').escape(),
  (req, res, next) => {
    const errors = validationResult(req)
    var user = new User({
      name: 'kamal',
      email: 'something@gmail.com',
      password: 'password',
    })
    if (!errors.isEmpty()) {
      Currency.find({}, 'name').exec(function(err, currencies) {
        if (err) {
          return next(err)
        }

        res.render('users/new', {
          title: 'Signup',
          currencies: currencies,
          errors: errors,
        })
      })
      return
    } else {
      user.save(function(err) {
        if (err) {
          return next(err)
        }
        res.redirect('/system/confirm')
      })
    }
  },
]

exports.createold = [
  body('name', 'Name must be specified')
    .trim()
    .isLength({min: 1}),
  body('email', 'Email must be specified')
    .trim()
    .isLength({min: 1})
    .isEmail('Not a valid email'),
  body('password', 'Password must be specified')
    .trim()
    .isLength({min: 5}),
  (req, res, next) => {
    const errors = validationResult(req)
    var user = new User({
      name: req.body.user,
      email: req.body.email,
      password: req.body.password,
    })
    console.log(`USER IS HERE : ${user}`)
    if (!errors.isEmpty()) {
      Currency.find({}, 'currency').exec(function(err, currencies) {
        if (err) {
          console.log('error')
          return next(err)
        }
        res.render('/users/new', {
          title: 'Signup',
          user: user,
          currencies: currencies,
        })
      })
      return
    } else {
      user.save(function(err) {
        if (err) {
          return next(err)
        }
        res.redirect('/user/confirm')
      })
    }
  },
]

exports.confirm = function(req, res, next) {
  res.render('users/confirm', {
    title: 'Confirmation',
  })
}
function consoleLog(message) {
  console.log('+++++++++++++++++++++++++++++++++++++++++++++++++')
  console.log(message)
  console.log('++++++++++++++++++++++++++++++++++++++++++++++++++')
}
