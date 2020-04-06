var Book = require('../models/book')
var async = require('async')

// Display list of all books
exports.book_list = function(req, res, next) {
  Book.find({}, 'title').exec(function(err, list_books) {
    if (err) {
      return next(err)
    }
    // successful, so render
    res.render('book_list', {title: 'Book List', book_list: list_books})
  })
}
