exports.get = function(req, res) {
  res.send('API v1 GET: Hello World!');
}

exports.post = function(req, res) {
  res.send('API v1 POST: '
    + JSON.stringify(req.body));
}
