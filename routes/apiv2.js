exports.v2get = function(req, res) {
  res.send('API v2 GET: Here belongs a succinct '
    + 'explanation how to use The Building Coder '
    + 'WebGL Viewer REST API v2...');
}

exports.v2post = function(req, res) {
  console.log('API v2 POST: ' + JSON.stringify(req.body));
  res.render('viewer', req.body);
}
