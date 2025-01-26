var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Alfonso Pisicchio' });
});

router.get('/cv', (req, res, next)=>{
  res.download('./CV.pdf');
});


module.exports = router;
