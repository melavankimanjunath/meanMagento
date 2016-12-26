var express = require('express'),
    //bodyParser = require('body-parser'),
    errorhandler = require('errorhandler'),
    routes = require('./routes'),
    api = require('./routes/api'),
    DB = require('./lib/accessDB'),
    app = express();

var port = process.env.PORT || 3000;

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());

app.use(express.static(__dirname + '/'));
app.use(errorhandler());

// Routes
app.get('/', routes.index);

// JSON API
var baseUrl = '/api/dataservice/';

app.get(baseUrl + 'category', api.category);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

// Start server

app.listen(port, function () {
    console.log("Server listening on port %d in %s mode", this.address().port, app.settings.env);
});

exports = module.exports = app;