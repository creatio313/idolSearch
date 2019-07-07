var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let idol1req = req.query.idol1;
  let idol2req = req.query.idol2;
  res.render('result', { idol1 : idol1req, idol2 : idol2req });
});

module.exports = router;
