var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {}); // leads to public/index.html

var bodyParser = require('body-parser');
app.use( bodyParser.json({ limit: '1mb' }) );
app.use( bodyParser.urlencoded({ extended: true, limit: '1mb' }) );

app.set('views', __dirname + '/views');

var use_swig_render = false;

if( use_swig_render ) {
  var swig = require('swig');
  app.engine('swig', swig.renderFile);
  app.set('view engine', 'swig');
  swig.setDefaults({ cache: false });
  app.set('view cache', false);
}
else {
  var handlebars = require('express-handlebars');
  app.engine('handlebars', handlebars());
  app.set('view engine', 'handlebars');
}

var apiv1 = require('./routes/apiv1');

app.get('/api/v1', apiv1.get);
app.post('/api/v1', apiv1.post);

var apiv2 = require('./routes/apiv2');

app.get('/api/v2', apiv2.get);
app.post('/api/v2', apiv2.post);

app.listen(app.get('port'), function() {
  console.log('Node WebGL app with '
    + (use_swig_render ? 'swig' : 'handlebars')
    + ' is running at localhost:'
    + app.get('port'));
});

