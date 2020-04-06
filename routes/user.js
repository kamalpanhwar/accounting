var express = require('express')
var router = express.Router()
var users_controller = require('../app/controllers/users_controller')
var book_controller = require('../app/controllers/bookController')

// ../app/controllers/users_controller.js

router.get('/users', users_controller.user_list)
router.get('/books', book_controller.book_list)
module.exports = router
