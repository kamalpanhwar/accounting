var express = require('express')
var router = express.Router()
var users_controller = require('../app/controllers/users_controller')
var homes_controller = require('../app/controllers/homes_controller')

// ../app/controllers/users_controller.js
router.get('/', homes_controller.index)
router.get('/system/signup', users_controller.new)
router.post('/system/signup', users_controller.create)
router.get('/system/confirm', users_controller.confirm)
router.get('/system/verify/:token', users_controller.verify)
router.get('/system/check_user/', users_controller.check_username)

module.exports = router
