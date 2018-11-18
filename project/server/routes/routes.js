var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('a data');
});

router.get('/hello/:id', function(req, res, next) {
  res.send('your data i: ' + req.params.id);
});

module.exports = router;
