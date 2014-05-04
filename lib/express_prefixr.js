(function() {
  var CSSDocument, app, express, logfmt, port;

  express = require('express');

  CSSDocument = require('./css_document');

  logfmt = require('logfmt');

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
    var css, ex, response;
    css = null;
    response = {
      status: null,
      result: null
    };
    try {
      css = new CSSDocument(req.body.css);
    } catch (_error) {
      ex = _error;
      console.log("Error: " + ex);
      if ((ex.name != null) && ex.name === 'ParsingException') {
        response.status = "error";
        response.result = ex.message;
      }
    }
    if (response.status == null) {
      css.parseDocument();
      css.rebuildDocument();
      response.status = "success";
      response.result = css.rebuildCSS();
    }
    res.setHeader('Content-Type', 'application/json');
    return res.send(JSON.stringify(response));
  });

  port = Number(process.env.PORT || 3000);

  app.listen(port, function() {
    return console.log("Listening on " + port);
  });

}).call(this);
