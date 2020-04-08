const nodemailer = require('nodemailer')
require('dotenv').config()
module.exports.NodeMailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER_NAME,
    pass: process.env.GMAIL_USER_PASSWORD,
  },
  jsonTransport: true,
})
