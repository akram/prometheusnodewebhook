var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  res.send(JSON.stringify(req.body, null, 2))
});

module.exports = router;
