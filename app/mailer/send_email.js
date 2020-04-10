const Mailer = require('../../lib/Mailer')

exports.verification = function(mailerOptions) {
  app_url = process.env.APP_URL
  const message = {
    from: process.env.DEFAULT_FROM,
    to: mailerOptions.to,
    subject: 'Please confirm your email',
    data: {
      name: mailerOptions.name,
      url: app_url,
      title: 'Email confimration',
      description: `Your signup is complete on ${app_url} please click following button to confirm your email address to start usng our portal.`,
      confirm_url: mailerOptions.verification_link,
      button_text: 'Confirm Email',
    },
    template: mailerOptions.template,
  }
  console.log(` Checking at mailer/send_email ${mailerOptions.template}`)

  Mailer.send(message)
    .then(console.log)
    .catch(console.error)
}

exports.reset_token = function(mailerOptions) {
  app_url = process.env.APP_URL
  const message = {
    from: process.env.DEFAULT_FROM,
    to: mailerOptions.to,
    subject: 'Reset your password',
    data: {
      name: mailerOptions.name,
      url: app_url,
      title: 'Reset your password',
      description: `You have requested for password reset ${app_url} Please click following button to reset your  password.`,
      confirm_url: mailerOptions.verification_link,
      button_text: 'Reset Password',
    },
    template: mailerOptions.template,
  }
  console.log(` Reset password ${mailerOptions.template}`)

  Mailer.send(message)
    .then(console.log)
    .catch(console.error)
}
