exports.v1 = function(req, res) {
  if (req.method == 'GET') {
    res.send('API v1 GET: Hello World!');
  }
  else if (req.method == 'POST') {
    res.send('API v1 POST: '
      + JSON.stringify(req.body));
  }
};

exports.v2 = function(req, res) {
  if (req.method == 'GET') {
    res.send('API v2 GET: Here belongs a succinct '
      + 'explanation how to use The Building Coder '
      + 'WebGL Viewer REST API v2...');
  }
  else if (req.method == 'POST') {
    console.log('API v2 POST: ' + JSON.stringify(req.body));
    res.render('viewer', req.body);
  }
};
