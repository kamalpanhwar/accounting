#! /user/bin/env/ node
console.log(
  'This script populate some basic required database and samples, please provide database in the command'
)

var userArgs = process.argv.slice(2)
var faker = require('faker'),
  async = require('async'),
  mongoose = require('mongoose')

var Currency = require('./app/models/currency')
var AccountType = require('./app/models/account_type')

var getCurrencyList = require('country-currency-map').getCurrencyList
var async = require('async')

var mongoDB = userArgs[0]
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.Promise = global.Promise
var db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

console.log('Deleting currencies')
async.waterfall[
  (deleteCurrencies(),
  createCurrencies(),
  deleteAccountTypes(),
  createAccountTypes())
]
//deleteAccountTypes()

//currencies = new Currency.find({})
function deleteCurrencies() {
  Currency.deleteMany({}, function(error, results) {
    if (error) console.log(error)
    console.log(results)
  })
}

function createCurrency(newcurrency) {
  var currency = new Currency({
    abbr: newcurrency.abbr,
    name: newcurrency.name,
    symbol: newcurrency.name,
  })
  currency.save(function(err) {
    if (err) {
      console.log(err)
      return
    }
    console.log(
      `New Currency added: symbol: ${currency.abbr} Name: ${currency.name} Symbole: ${currency.sybmol} `
    )
  })
}
function createCurrencies() {
  currencies = getCurrencyList()
  for (let currency of currencies) {
    createCurrency(currency)
  }
}

function createAccountType(newaccount) {
  var account_type = new AccountType({
    name: newaccount.name,
    type: newaccount.type,
    number: newaccount.number,
  })
  account_type.save(function(err) {
    if (err) {
      console.log(err)
      return
    }
    console.log(
      `New Account Type added: name: ${account_type.name} Type: ${account_type.type} Number: ${account_type.number} `
    )
  })
}

function deleteAccountTypes() {
  AccountType.deleteMany({}, function(error, accountTypes) {
    if (error) {
      console.log(error)
    }
    console.log(accountTypes)
  })
}

function createAccountTypes() {
  // Adding account types
  const account_types = [
    {name: 'Banking', type: 'Current Assets', number: 101},
    {
      name: 'Cash Payroll checking Banking',
      type: 'Current Assets',
      number: 102,
    },
    {name: 'Petty Cash Fund', type: 'Current Assets', number: 105},
    {name: 'Accounts Receivable', type: 'Current Assets', number: 121},
    {
      name: 'Allowance for Doubtful Accounts',
      type: 'Current Assets',
      number: 125,
    },
    {name: 'inventory', type: 'Current Assets', number: 131},
    {name: 'Suppliers', type: 'Current Assets', number: 141},
    {name: 'Perpaid Insurance', type: 'Current Assets', number: 153},

    {name: 'Land', type: 'Property, Plant and equipment', number: 170},
    {name: 'Buildings', type: 'Property, Plant and equipment', number: 171},
    {name: 'Equipment', type: 'Property, Plant and equipment', number: 173},
    {name: 'Vehicles', type: 'Property, Plant and equipment', number: 178},
    {
      name: 'Accumulated Depcreciations - Buildings',
      type: 'Property, Plant and equipment',
      number: 181,
    },

    {
      name: 'Accumulated Depression - Equipment',
      type: 'Property, Plant and equipment',
      number: 183,
    },

    {
      name: 'Accumulated Depression - Vehicles',
      type: 'Property, Plant and equipment',
      number: 188,
    },

    {name: 'Notes Payable', type: 'Current Liability', number: 2014},
    {name: 'Accounts Payable', type: 'Current Liability', number: 210},
    {name: 'Wages Payable', type: 'Current Liability', number: 221},
    {name: 'Interest Payable', type: 'Current Liability', number: 231},
    {name: 'Unearned Revenue', type: 'Current Liability', number: 245},
    {name: 'Mortgage', type: 'Long-term Liabilities', number: 250},
    {name: 'Bonds Payable', type: 'Long-term Liabilities', number: 260},
    {
      name: 'Discount on Bonds Payable',
      type: 'Long-term Liabilities',
      number: 257,
    },

    {name: 'Common stock, No Par', type: 'Stockholders Equity', number: 271},
    {name: 'Retained Earnings', type: 'Stockholders Equity', number: 275},
    {name: 'Treasurey Stock', type: 'Stockholders Equity', number: 295},
    {name: 'Sales - Division #1', type: 'Operating Revenues', number: 31},
    {name: 'COGS- Division #1', type: 'Product Line 010', number: 410},

    {name: 'Marketing Dept. Salaries', type: 'Marketing Expenses', number: 501},
    {
      name: 'Marketing Dept. Payroll taxes',
      type: 'Marketing Expenses',
      number: 5015,
    },
    {name: 'Marketing Dept. Supplies', type: 'Marketing Expenses', number: 502},
    {
      name: 'Marketing Dept. Telephone',
      type: 'Marketing Expenses',
      number: 506,
    },

    {
      name: 'Payroll Dept. Salaries',
      type: 'Payroll Dept. Expenses',
      number: 506,
    },
    {
      name: 'Payroll Dept. Payroll Taxes',
      type: 'Payroll Dept. Expenses',
      number: 506,
    },
    {
      name: 'Payroll Dept. Supplies',
      type: 'Payroll Dept. Expenses',
      number: 507,
    },
    {name: 'Payroll Dept. Telephone', type: 'Marketing Expenses', number: 410},

    {name: 'Gain on Sale of Assets', type: 'Other', number: 918},
    {name: 'Loss on Sale of Assets', type: 'Other', number: 961},

    {
      name: 'Non Operating Revenues and Gains',
      type: 'Operating Revenue',
      number: 71,
    },
    {
      name: 'Non Operating expenses and losses',
      type: 'Operating Revenue',
      number: 75,
    },
  ]

  for (let account_type of account_types) {
    createAccountType(account_type)
  }
}
