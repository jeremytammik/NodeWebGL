var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {}); // leads to public/index.html

//var bodyParser = require('body-parser')
//app.use( bodyParser.json() ); // to support JSON-encoded bodies
//app.use(express.json()); // to support JSON-encoded body
//app.get('/api/v1', api.v1);

//var getRawBody = require('raw-body');
//var typer = require('media-typer');
//
//app.use(function (req, res, next) {
//  getRawBody(req, {
//    length: req.headers['content-length'],
//    limit: '1mb',
//    encoding: typer.parse(req.headers['content-type']).parameters.charset
//  }, function (err, string) {
//    if (err)
//      return next(err)
//    req.text = string
//    next()
//  });
//});

var bodyParser = require('body-parser');
//app.use( bodyParser.json() ); // to support JSON-encoded bodies
//app.use( bodyParser() ); // use the deprecated bodyParser middleware for all routes; generates warnings
//app.use( bodyParser.urlencoded() ); // generates warnings
app.use( bodyParser.urlencoded({ extended: true }) );

var api = require('./routes/api');
app.get('/api/v1', api.v1);
app.post('/api/v1', api.v1);

app.listen(app.get('port'), function() {
  console.log("Node WebGL app is running at localhost:"
    + app.get('port'));
});
