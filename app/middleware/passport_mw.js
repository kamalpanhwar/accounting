const passport = require('passport'),
  Strategy = require('passport-local').Strategy
var User = require('../models/user')

passport.use(
  new Strategy((username, password, done) => {
    User.findByEmail(email, (err, user) => {
      if (err) {
        return done(err)
      }
      if (!user) {
        return done(null, false)
      }
      if (user.comparePassword(password)) {
        return done(null, false)
      }
    })
  })
)

app.use(passport.initialize())
