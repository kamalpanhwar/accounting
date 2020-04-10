var User = require('../models/user')
var Currency = require('../models/currency')
const {body, validationResult} = require('express-validator/check')
const {sanitizeBody} = require('express-validator/filter')
const send_email = require('../mailer/send_email')
const passport = require('passport')
//require('../../config/passport')(passport)

;(LocalStrategy = require('passport-local').Strategy),
  passport.use(
    new LocalStrategy(function(username, password, done) {
      User.findOne({email: username}, function(err, user) {
        if (err) {
          return done(err)
        }
        if (!user) {
          return done(null, false, {message: 'Incorrect Username'})
        }
        if (!user.comparePassword(password)) {
          return done(null, false, {message: 'Incorrect password'})
        }
        return done(null, user)
      })
    })
  )

passport.serializeUser(function(user, cb) {
  cb(null, user.id)
})

passport.deserializeUser(function(id, cb) {
  User.findById(id, function(err, user) {
    if (err) {
      return cb(err)
    }
    cb(null, user)
  })
})

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

exports.index = function(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/')
  } else {
    res.render('users/login', {
      title: 'Login',
      messages: req.flash('error'),
    })
  }
}

exports.forget = function(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/system')
  } else {
    res.render('users/forget', {
      title: 'Forget Password',
      messages: req.flash('error'),
    })
  }
}
exports.recover = async function(req, res, next) {
  try {
    const {email} = req.body
    const user = await User.findOne({email})

    if (!user) {
      res.render('users/message', {
        title: 'Email not associated',
        message: `The email address ${email} is not associated with any account. Double-check your email address and try again.`,
      })
      return
    }
    user.generatePasswordReset()
    await user.save()
    sendPasswordResetEmail(user, req)
    res.render('users/message', {
      title: 'We sent you email to reset password',
      message: `We sent email on ${email} please check and reset password.`,
    })
    return
  } catch (error) {
    console.log(error)
  }
}

exports.login = passport.authenticate('local', {
  failureRedirect: '/system/login/',
  successRedirect: '/system',
  failureFlash: true,
})

exports.logout = (req, res, next) => {
  req.logout()
  res.redirect('/')
}

exports.loginold = [
  body('username', 'Username must be specified')
    .isLength({min: 1})
    .trim()
    .withMessage('Email must be specified'),

  body('encrypted_password')
    .isLength({min: 5})
    .trim()
    .withMessage('Password must be specified'),

  sanitizeBody('username').escape(),
  sanitizeBody('password').escape(),

  (req, res, next) => {
    passport.authenticate('local', {failureRedirect: '/system/login'}),
      function(req, res) {
        console.log('Issue')
        res.redirect('/')
      }
  },
]

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
  sanitizeBody('encrypted_password').escape(),
  sanitizeBody('username').escape(),
  sanitizeBody('currency').escape(),
  sanitizeBody('email').escape(),
  sanitizeBody('organization').escape(),

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
        sendVerificationEmail(user, req)
        res.redirect('/system/confirm/' + user.email)
      })
    }
  },
]

async function sendVerificationEmail(user, req) {
  var mailOptions = {
    name: user.name,
    email: user.email,
    token: user.verification_token,
  }

  let link =
    'http://' + req.headers.host + '/system/verify/' + user.confirmation_token
  var mailOptions = {
    from: process.env.DEFAULT_FROM,
    to: user.email,
    subject: 'Please confirm your email',
    name: user.name,
    verification_link: link,
    template: './app/views/mailers/email_confirmation',
  }

  send_email.verification(mailOptions)
}

async function sendPasswordResetEmail(user, req) {
  var mailOptions = {
    name: user.name,
    email: user.email,
    token: user.verification_token,
  }

  let link =
    'http://' + req.headers.host + '/system/reset/' + user.reset_password_token
  var mailOptions = {
    from: process.env.DEFAULT_FROM,
    to: user.email,
    subject: 'Rest your password',
    name: user.name,
    verification_link: link,
    template: './app/views/mailers/reset_password',
  }
  send_email.reset_token(mailOptions)
}

exports.reset = async (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/system')
  } else {
    try {
      const {token} = req.params

      const user = await User.findOne({reset_password_token: token})

      if (!user) {
        res.render('users/message', {
          title: 'No such token found',
          message: `Please check your email to click correct link with correct token.`,
        })
        return
      }
      res.render('users/reset', {
        title: 'Reset password',
        token: token,
      })
      return
    } catch (err) {
      console.log(err)
    }
  }
}

exports.reset_password = async function(req, res, next) {
  try {
    var token = req.params.token
    const user = await User.findOne({reset_password_token: token})
    if (!user) {
      res.render('users/message', {
        title: 'No such token found',
        message: `Please check your email to click correct link with correct token.`,
      })
      return
    }
    user.encrypted_password = req.body.encrypted_password
    user.save(function(err) {
      if (err) {
        res.render('users/message', {
          title: 'Unexcepted error happen in saving password user',
          message: 'Unhandled error occured while saving password users.',
        })
        return
      }
      res.render('users/message', {
        title: 'You have changed password.',
        message: 'You successfully changed password',
      })
      return
    })
  } catch (err) {
    console.log(err)
  }
}

exports.resendToken = async (req, res) => {
  try {
    console.log(req.params.email)
    const email = req.params.email

    const user = await User.findOne({email: email})
    //const user = await User.findOne({email: email}, function(error, user) {
    //      if (error) {
    //        console.log('error druing quering database')
    //      }
    //      console.log(user.name)
    //    })
    console.log(user.name)
    if (!user) {
      res.render('users/message', {
        title: 'Email not associated',
        message: `The email address ${email} is not associated with any account. Double-check your email address and try again.`,
      })
      return
    }

    if (user.approved) {
      res.render('users/message', {
        title: 'Your account is already approved',
        message: `The email address ${email} is already apprvoed. Pleaswe login.`,
      })
      return
    }

    sendVerificationEmail(user, req)
    res.redirect('/system/confirm/' + user.email)
    return
  } catch (err) {
    res.render('users/message', {
      title: 'Unhandled error occured',
      message: `Unhandled error occured.`,
    })
    return
  }
}

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
    user_email: req.params.email,
  })
}

function consoleLog(message) {
  console.log('+++++++++++++++++++++++++++++++++++++++++++++++++')
  console.log(message)
  console.log('++++++++++++++++++++++++++++++++++++++++++++++++++')
}
