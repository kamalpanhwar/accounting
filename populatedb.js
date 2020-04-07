#! /user/bin/env/ node
console.log(
  'This script populate some basic required database and samples, please provide database in the command'
)

var userArgs = process.argv.slice(2)
var faker = require('faker'),
  async = require('async'),
  mongoose = require('mongoose')

var Currency = require('./app/models/currency')

var mongoDB = userArgs[0]
console.log(mongoDB)
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})
console.log('Connecting to server')
mongoose.Promise = global.Promise
var db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

var currencies = []

function createCurrency(name, cb) {
  var currency = new Currency({name: name})
  currency.save(function(err) {
    if (err) {
      console.log(err)
      cb(err, null)
      return
    }
    console.log('New currency: ' + currency)
    currencies.push(currency)
    cb(null, currency)
  })
}

createCurrency(faker.finance.currencyCode(), function(result, err) {
  if (err) {
    console.log(err)
  }
  console.log(err)
})

createCurrency(faker.finance.currencyCode(), function(result, err) {
  if (err) {
    console.log(err)
  }
  console.log(err)
})

createCurrency(faker.finance.currencyCode(), function(result, err) {
  if (err) {
    console.log(err)
  }
  console.log(err)
})
