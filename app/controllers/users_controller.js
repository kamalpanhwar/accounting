var User = require('../models/user')
var Currency = require('../models/currency')
const {body, validationResult} = require('express-validator/check')
const {sanitizeBody} = require('express-validator/filter')
const send_email = require('../mailer/send_email')

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
      if (value !== req.body.password_confirm) {
        throw new Error("Password don't match")
      } else {
        return value
      }
    }),
  body('username')
    .isLength({min: 5})
    .trim()
    .withMessage('Username must be specified')
    .custom((value, {req, loc, path}) => {
      count = User.countDocuments({username: value}, function(error, count) {
        if (error) {
          console.log('unexpected error in searching username from database')
        }
      })
      console.log(count)
      if (count > 0) {
        throw new Error('User not exists finally')
      } else {
        return value
      }
    }),
  body('currency')
    .isLength({min: 1})
    .trim()
    .withMessage('Currency is required'),
  // Sanitize fields
  sanitizeBody('name').escape(),
  sanitizeBody('encrypted_email').escape(),
  sanitizeBody('username').escape(),
  sanitizeBody('currency').escape(),
  sanitizeBody('email').escape(),

  (req, res, next) => {
    const errors = validationResult(req)
    var user = new User({
      name: req.body.name,
      email: req.body.email,
      encrypted_password: req.body.encrypted_password,
      username: req.body.username,
      currency_id: req.body.currency,
      organization: req.body.organization,
      confirmation_sent_at: Date.now(),
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

        var mailOptions = {
          name: user.name,
          email: user.email,
          token: user.verification_token,
        }

        let link =
          'http://' +
          req.headers.host +
          '/system/verify/' +
          user.confirmation_token
        var mailOptions = {
          from: process.env.DEFAULT_FROM,
          to: user.email,
          subject: 'Please confirm your email',
          name: user.name,
          verification_link: link,
          template: './app/views/mailers/email_confirmation',
        }

        send_email.verification(mailOptions)
        res.redirect('/system/confirm')
      })
    }
  },
]

exports.verify = async function(req, res, next) {
  if (!req.params.token)
    res.render('users/message', {
      title: 'No token provided',
      message: 'You have not provided any token, please click link from email',
    }) // you should send user to dahsboard.
  try {
    User.findOne({confirmation_token: req.params.token}, (error, user) => {
      if (!user) {
        res.render('users/message', {
          title: 'No user with token found',
          message:
            'We were unable to find a user for this token, Please click linke on email',
        })
        return
      }

      if (user.approved) {
        res.render('users/message', {
          title: 'User already verified',
          message: 'The account has been already verified. Please log in.',
        })
        return
      }
      user.approved = true
      user.confirmed_at = Date.now()
      user.unconfirmed_email = false
      user.verification_token = ''
      user.save(function(err) {
        if (err) {
          res.render('users/message', {
            title: 'Unexcepted error happen in verifying user',
            message: 'Unhandled error occured while verifying users.',
          })
          return
        }
        res.render('users/message', {
          title: 'User is confirmed.',
          message: 'You are now confirmed user, please login',
        })
        return
      })
    })
  } catch (error) {}
}

exports.check_username = async function(req, res, next) {
  console.log('I AM INSIDE CHECK_USER')

  console.log(req.query.username)
  console.log(req.query.email)
  console.log('I AM OUTSIDE CHECK_USER')
  if (req.query.username) {
    try {
      User.countDocuments({username: req.query.username}, (error, count) => {
        if (error) {
          res.render('users/message', {
            title: 'Error',
            message: 'Some issue in databae',
          })
          return
        }
        res.status(200).json(!count > 0)
      })
    } catch (error) {
      console.log(error)
    }
  }

  if (req.query.email) {
    try {
      User.countDocuments({email: req.query.email}, (error, count) => {
        if (error) {
          res.render('users/message', {
            title: 'Error',
            message: 'Some issue in databae',
          })
          return
        }
        res.status(200).json(!count > 0)
      })
    } catch (error) {
      console.log(error)
    }
  }
}

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
