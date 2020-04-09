var express = require('express')
var router = express.Router()
var users_controller = require('../app/controllers/users_controller')
var homes_controller = require('../app/controllers/homes_controller')

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  } else {
    return res.redirect('/system/login')
  }
}

router.get('/', homes_controller.index)
router.get('/system/signup', users_controller.new)
router.post('/system/signup', users_controller.create)
router.post('/system/login', users_controller.login)
router.get('/system/login', users_controller.index)
router.get('/system', isLoggedIn, homes_controller.home)
//router.post(
//  '/system/login',
//  passport.authenticate('local', {
//    successRedirect: '/',
//    failureRedirect: '/system/login',
//  })
//)
router.get('/system/confirm/:email', users_controller.confirm)
router.get('/system/verify/:token', users_controller.verify)
router.get('/system/check_user/', users_controller.check_username)
router.get('/system/resendToken/:email', users_controller.resendToken)

module.exports = router
