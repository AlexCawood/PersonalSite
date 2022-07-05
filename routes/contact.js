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
const questions = [
    {id:0,question:'2 + 3 = ', answer:'5'},
    {id:1,question:'1 + 3 = ', answer:'4'},
    {id:2,question:'3 + 3 = ', answer:'6'},
    {id:3,question:'6 + 7 = ', answer:'13'},
    {id:4,question:'10 - 80 = ', answer:'70'},
    {id:5,question:'9 - 9 = ', answer:'0'},
    {id:6,question:'3 - 9 = ', answer:'-6'},
    {id:7,question:'What colour is the sky', answer:'blue'},
    {id:8,question:'3 - 2 =', answer:'1'},
    {id:9,question:'7 - 2 =', answer:'5'},
    {id:10,question:'7 - 1 =', answer:'6'},
]

bannedUserNames = [
  'CrytoKer'.toLowerCase(),
  'Alex'.toLowerCase()
]

/* GET home page. */
router.get('/', function(req, res, next) {
  let rando = Math.round(Math.random()*10,0)

  let questionId = questions[rando].id
  let question = questions[rando].question

  res.render('pages/contact', { title: 'contact',question: [questionId,question],data:[]});
});

router.post('/', function(req, res, next) {
    if (!req.body) res.sendStatus(404)

    // console.log(req.body.message);
    let questionId = req.body.questionId
    let answer = req.body.answer.toLowerCase()
    console.log('answerId',questionId);
    console.log('answer',answer);

    if(questions[parseInt(questionId)].answer.toLowerCase() === answer){
      const username = req.body.name.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      const email = req.body.email.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      const message = req.body.message.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      var mailOptions = {
        from: process.env.email,
        to: process.env.email,
        subject: username+" has sent you a message",
        text: message + '\n\nFrom: '+email
      };
      if(!bannedUserNames.includes(username.toLowerCase())) {

     
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    }
      // res.render('pages/contact', { title: 'contact' });
      res.redirect('/contact');
    } else{

      console.log('wrong answer');
      let rando = Math.round(Math.random()*10,0)

      let questionId = questions[rando].id
      let question = questions[rando].question
      const username = req.body.name.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      const email = req.body.email.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      const message = req.body.message.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      const error = 'Incorrect Answer'
      res.render('pages/contact', { title: 'contact',question: [questionId,question],data:[username,email,message,error]});
    }

    
    
  });

module.exports = router;