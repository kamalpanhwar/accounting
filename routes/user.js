var express = require('express')
var router = express.Router()
var users_controller = require('../app/controllers/users_controller')
var homes_controller = require('../app/controllers/homes_controller')

// ../app/controllers/users_controller.js
router.get('/', homes_controller.index)
router.get('/system/signup', users_controller.new)
router.post('/system/signup', users_controller.create)
router.get('/system/confirm', users_controller.confirm)

module.exports = router
