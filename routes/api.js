exports.v1 = function(req, res) {
  if (req.method == 'GET') {
    res.send('API v1 GET: Hello World!');
  }
  else if (req.method == 'POST') {
    res.send('API v1 POST: ' + JSON.stringify(req.body));
  }
};
