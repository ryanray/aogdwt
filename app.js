
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes'); // basicAuth - https://github.com/senchalabs/connect/blob/master/examples/basicAuth.js

var app = module.exports = express.createServer();

var basicAuth = express.basicAuth( 'bwell', 'ard' );

var auth = function( user, pass ){
	return ( user != pass );
}

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
app.get('/', basicAuth, function(req, res, next) {
  return next();
});
app.use(express.static("" + __dirname + "/public"));

app.listen(8080, function(){
  console.log("Express server listening on port %d in %s mode",app.address().port, app.settings.env);
});
