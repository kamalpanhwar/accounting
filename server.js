const express = require('express'),
  morgan = require('morgan'),
  path = require('path'),
  createError = require('http-errors')
require('dotenv').config()

// Initialize server
var app = express()

// Local classes
var MongoDB = require('./db/database'),
  userRouter = require('./routes/user')

app.use(morgan('combined'))

// Err of ianything happen in DB connection or any other promise
process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandle Rejection at: ', p, 'reason:', reason)
})

app.set('views', path.join(__dirname, 'app/views'))
app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'public')))
app.use('/', userRouter)

// Create 404 error reporting
app.use(function(req, res, next) {
  next(createError(404))
})

app.use(function(err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500)
  res.render('error')
})

port = process.env.PORT || 3000

app.listen(3000, (req, res) =>
  console.log('Server is listening on http://localhost:3000')
)
