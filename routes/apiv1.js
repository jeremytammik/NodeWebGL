var express = require('express');
var router = express.Router();

router.get ('/', function(req, res) {
  res.send('API v1 GET: Hello World!');
});

router.post ('/', function(req, res) {
  res.send('API v1 POST: '
    + JSON.stringify(req.body));
});

module.exports = router;