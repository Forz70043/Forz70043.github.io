var express = require('express');
var router = express.Router();

// Add rate limiter for the '/cv' route
var rateLimit = require('express-rate-limit');
const cvLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // limit each IP to 5 requests per windowMs
  message: "Too many download requests from this IP, please try again after a minute."
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Alfonso Pisicchio' });
});

router.get('/cv', cvLimiter, (req, res, next)=>{
  res.download('./CV.pdf');
});


module.exports = router;
