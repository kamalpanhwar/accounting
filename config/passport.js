var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy
var UserModel = require('../app/models/user')

passport.use(
  new LocalStrategy(function(username, password, done) {
    UserModel.findOne({username: username}, function(err, user) {
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
