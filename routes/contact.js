var express = require('express');
const nodemailer = require('nodemailer');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/contact', { title: 'contact' });
});

router.post('/', function(req, res, next) {
    console.log(req.body);
    // res.render('pages/contact', { title: 'contact' });
    res.render('pages/contact', { title: 'contact' });
  });

module.exports = router;