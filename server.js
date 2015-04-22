var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {}); // leads to public/index.html

var bodyParser = require('body-parser');
app.use( bodyParser.urlencoded({ extended: true }) );

var api = require('./routes/api');
app.get('/api/v1', api.v1);
app.post('/api/v1', api.v1);

app.listen(app.get('port'), function() {
  console.log("Node WebGL app is running at localhost:"
    + app.get('port'));
});
