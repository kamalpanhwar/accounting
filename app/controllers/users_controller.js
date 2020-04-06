var User = require('../models/user')
var async = require('async')

exports.user_list = function(req, res, next) {
  User.find({}, 'name').exec(function(err, list_user) {
    if (err) {
      return next(err)
    }
    res.render('user_list', {
      title: 'Users List',
      user_list: list_user,
    })
  })
}
