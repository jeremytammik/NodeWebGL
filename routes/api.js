
exports.v1 = function(req, res) {
  //console.log(JSON.stringify(req.method));
  console.log(req.method);
  //console.log(Object.keys(req));

  if (req.method == 'GET') {
    res.send('API v1 GET: Hello World!');
  }
  else if (req.method == 'POST') {
    console.log(req.body);
    res.send('API v1 POST: ' + JSON.stringify(req.body));
    //var jsonString = '';
    //req.on('data', function (data) {
    //  jsonString += data;
    //  if(jsonString.length > 1e6) {
    //    jsonString = '';
    //    response.writeHead(413, {'Content-Type': 'text/plain'}).end();
    //    request.connection.destroy();
    //  }
    //});
    //req.on('end', function () {
    //  console.log(JSON.parse(jsonString));
    //});
  }
};