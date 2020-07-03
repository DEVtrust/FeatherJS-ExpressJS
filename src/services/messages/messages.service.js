// Initializes the `messages` service on path `/messages`
const hooks = require('./messages.hooks');
const Mailer = require('feathers-mailer');
const smtpTransport = require('nodemailer-smtp-transport');

module.exports = async function (app) {
  app.use('/messages', Mailer(smtpTransport({
    host: 'email-smtp.us-east-1.amazonaws.com',
    secure: true,
    auth: { //ses-smtp-user.20200512-142946
      user: 'AKIA4EBGQY5CMJQQFRNH',
      pass: 'BNTEr3uzh+5+oiLreSrqbPwbvpfAoTW/TE0DkucViFpC'
    }
  }), {from: 'jeremy@signalscout.io'}));

  const service = app.service('messages');
  service.hooks(hooks);
};
