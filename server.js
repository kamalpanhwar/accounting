const express = require('express'),
  morgan = require('morgan'),
  path = require('path'),
  createError = require('http-errors'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  flash = require('connect-flash'),
  passport = require('passport')

const MongoStore = require('connect-mongo')(session)
global.appRoot = path.resolve(__dirname)
require('dotenv').config()

var MongoDB = require('./db/database')

var app = express()

app.use(
  session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
  })
)

var Router = require('./config/routes')

app.use(express.json())
app.use(flash())

app.use((req, res, next) => {
  if (res.locals.errors) {
    res.locals.errors = req.flash('error')
  }
  if (res.locals.errors) {
    res.locals.successes = req.flash('success')
  }
  next()
})
app.use(morgan('combined'))
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

app.use(passport.initialize())
app.use(passport.session())

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandle Rejection at: ', p, 'reason:', reason)
})

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'app/views'))
app.set('view engine', 'pug')

app.use('/', Router)

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
