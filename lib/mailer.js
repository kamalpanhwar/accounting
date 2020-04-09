const Email = require('email-templates')
const nodemailer = require('nodemailer')
const config = require('../config/config')
var transporter = config.NodeMailTransporter
require('dotenv').config()
const isLocal = process.env.NODE_ENV === 'dev'

class Mailer {
  static async send(message) {
    try {
      const {from, to, subject, data, template} = message
      const email = new Email({
        //views: {root: './app/views/mailers/general'},
        views: {root: template},
        preview: isLocal,
      })
      console.log(` chaking at lib/mailer #{template}`)
      if (isLocal) {
        await email.send({
          message: {
            from,
            to,
            subject,
            html: await email.render('body', data),
          },
        })
      } else {
        const email = new Email({
          views: {root: template},
          preview: false,
          message: {
            from: from,
          },
          send: true,
          transport: {
            host: 'smtp.mailtrap.io',
            port: 2525,
            ssl: false,
            tls: true,
            auth: {
              user: '7bb21768c3d4c1', // your Mailtrap username
              pass: 'c7b58bdf7853d7', //your Mailtrap password
            },
          },
        })

        await email.send({
          message: {
            from,
            to,
            subject,
            html: await email.render('body', data),
          },
        })
      }
    } catch (error) {
      console.error(error)
    }
  }
}

module.exports = Mailer
