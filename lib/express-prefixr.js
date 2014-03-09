(function() {
  var app, autoprefixer, cssbeautify, express, logfmt, port, prefixr;

  express = require('express');

  cssbeautify = require('cssbeautify');

  prefixr = require('./prefixr');

  logfmt = require('logfmt');

  autoprefixer = require('autoprefixer');

  app = express();

  app.use(express["static"]("" + __dirname + "/../public"));

  app.use(logfmt.requestLogger());

  app.use(express.json());

  app.use(express.urlencoded());

  app.set('views', "" + __dirname + "/../views");

  app.set('view engine', 'jade');

  app.get('/', function(req, res) {
    return res.render('index', {
      host: req.headers.host
    });
  });

  app.post('/api/processor', function(req, res) {
    return res.send(autoprefixer.process(css).css);
  });

  port = Number(process.env.PORT || 3000);

  app.listen(port, function() {
    return console.log("Listening on " + port);
  });

}).call(this);
