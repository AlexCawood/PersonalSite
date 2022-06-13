var express = require('express');
const nodemailer = require('nodemailer');
var router = express.Router();
require('dotenv').config()

var transporter = nodemailer.createTransport({
  host:"smtpout.secureserver.net",
  secure: false,
  port:587,
  secureConnection: false,
  auth: {
    user: process.env.email,
    pass: process.env.password
  }
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/contact', { title: 'contact' });
});

router.post('/', function(req, res, next) {
    if (!req.body) res.sendStatus(404)

    console.log(req.body.message);
    username = req.body.name.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    email = req.body.email.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    message = req.body.message.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var mailOptions = {
      from: process.env.email,
      to: process.env.email,
      subject: username+"has sent you a message",
      text: message + '\n\nFrom: '+email
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    // res.render('pages/contact', { title: 'contact' });
    res.render('pages/contact', { title: 'contact' });
  });

module.exports = router;