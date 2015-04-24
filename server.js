var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {}); // leads to public/index.html

var bodyParser = require('body-parser');
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }) );

//var exphbs  = require('express-handlebars');
//app.engine('handlebars', exphbs()); // {defaultLayout: 'main'}
//app.set('view engine', 'handlebars');

var swig = require('swig');
app.engine('swig', swig.renderFile);
app.set('view engine', 'swig');
app.set('views', __dirname + '/views');
app.set('view cache', false);
swig.setDefaults({ cache: false });

var api = require('./routes/api');

app.get('/api/v1', api.v1);
app.post('/api/v1', api.v1);

app.get('/api/v2', api.v2);
app.post('/api/v2', api.v2);

app.listen(app.get('port'), function() {
  console.log("Node WebGL app is running at localhost:"
    + app.get('port'));
});
