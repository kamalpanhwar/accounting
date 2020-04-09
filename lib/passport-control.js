const passport = require('passport'),
  Strategy = require('passport-local').Strategy
//UserModel = require('../app/models/User')

// Local Strategy
passport.use(
  new Strategy((username, password, done) => {
    console.log(
      'finally I am inisde passport' + username + ' pasword: ' + password
    )
    UserModel.findOne({username: username}, (err, user) => {
      // If any error
      if (err) {
        return done(err)
      }

      // If no user found
      if (!user) {
        return done(null, false, {
          message: 'No user found.',
        })
      }

      // Password not matched
      if (user.comparePassword(password)) {
        return done(null, false, {
          message: 'Password not matched.',
        })
      }

      return done(null, user)
    })
  })
)

// Session
passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    if (err) {
      return done(err)
    }
    done(null, user)
  })
})

module.exports = passport
