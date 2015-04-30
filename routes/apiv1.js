exports.v1get = function(req, res) {
  res.send('API v1 GET: Hello World!');
}

exports.v1post = function(req, res) {
  res.send('API v1 POST: '
    + JSON.stringify(req.body));
}
